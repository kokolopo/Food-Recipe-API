import userModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { responseAPI } from "../helper/responseFormatter.js";
import {
  generateRandomString,
  htmlTemplate,
  request,
} from "../helper/resetPassword.js";
import {
  MinioClient,
  uploadFile,
  removeFile,
} from "../helper/objectStorage.js";
import recipeModel from "../models/recipeModel.js";
// import client from "../config/redis.js";

const {
  create,
  findAll,
  findByEmail,
  findByToken,
  updateToken,
  updateProfile,
  updatePassword,
  findById,
  updatePhoto,
} = userModel;

const userController = {
  register: async (req, res) => {
    const { name, email, phone, password, confPassword } = req.body;
    const uuid = uuidv4();

    if (password !== confPassword)
      return res.status(400).json({ msg: "password invalid" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await create(uuid, name, email, phone, hashPassword);
      res
        .status(201)
        .json(responseAPI("registrasi berhasil", { name, email, phone }));
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await findByEmail(email);
      const match = await bcrypt.compare(password, user.password);

      if (!match) return res.status(400).json({ msg: "password salah!" });

      const { id, name, role } = user;
      const accessToken = jwt.sign(
        { id, name, email, role },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      const refreshToken = jwt.sign(
        { id, name, email, role },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      await updateToken(id, refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res
        .status(200)
        .json(responseAPI("login berhasil", { name, accessToken }));
    } catch (error) {
      res.status(400).json({ msg: "email tidak ditemukan!", errors: error });
    }
  },

  editProfile: async (req, res) => {
    const { name, email, phone } = req.body;
    const token = req.cookies.refreshToken;
    const user = jwt.decode(token, { complete: true });

    try {
      await updateProfile(user.payload.id, name, email, phone);
      res
        .status(200)
        .json(
          responseAPI("berhasil memperbaharui profile", { isUpdated: true })
        );
    } catch (error) {
      res.status(400).json(responseAPI("gagal memperbaharui profile", error));
    }
  },

  resetPassword: async (req, res) => {
    const { email } = req.body;

    const password = generateRandomString(12);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const tmplt = htmlTemplate(password);

    try {
      const user = await findByEmail(email);
      if (!user) return res.sendStatus(404);
      await updatePassword(user.id, hashPassword);
      request(user.email, tmplt);
      res
        .status(202)
        .json(
          responseAPI("password berhasil diperbaharui", "silahkan cek email!")
        );
    } catch (error) {
      res.status(400).json({ msg: "email tidak ditemukan!", errors: error });
    }
  },

  changePassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const token = req.cookies.refreshToken;
    const credential = jwt.decode(token, { complete: true });

    try {
      const user = await findById(credential.payload.id);
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) return res.status(400).json({ msg: "password lama salah!" });

      await updatePassword(user.id, newPassword);
      res
        .status(200)
        .json(
          responseAPI("password berhasil diperbaharui", { isUpdated: true })
        );
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },

  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(401);
      const user = await findByToken(refreshToken);
      if (!user) return res.sendStatus(403);
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403);
        const { id, name, email } = user;
        const accessToken = jwt.sign(
          { id, name, email },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        res
          .status(200)
          .json(responseAPI("refresh token berhasil", accessToken));
      });
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },

  logout: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(204);
      const user = await findByToken(refreshToken);
      if (!user) return res.sendStatus(204);

      const { id } = user;
      await updateToken(id, null);
      res.clearCookie("refreshToken");
      res.status(200).json(responseAPI("berhasil logout"));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },

  uploadPhoto: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(401);

      const user = await findByToken(refreshToken);
      if (!user) return res.sendStatus(204);

      if (user.image_url !== "default") {
        const err = removeFile(user.image_url);
        if (err) return res.sendStatus(204);
      }

      const objectName = generateRandomString(10);
      uploadFile(req.file.path, objectName);
      await updatePhoto(refreshToken, objectName);
      const presignedUrl = await MinioClient.presignedGetObject(
        "foodimages",
        objectName
      );

      res.status(200).json(responseAPI("upload photo berhasil", presignedUrl));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },

  listUsers: async (req, res) => {
    try {
      const users = await findAll();
      res.status(200).json(responseAPI("data users", users));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },

  findById: async (req, res) => {
    const id = req.params.id;
    findById(id)
      .then((result) => {
        // const dataRedis = client.set(`${req.url}`, JSON.stringify(result), {
        //   EX: 180,
        //   NX: true,
        // });
        res.send({
          fromCache: false,
          data: result,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};

export default userController;
