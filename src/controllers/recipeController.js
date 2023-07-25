import recipeModel from "../models/recipeModel.js";
import jwt from "jsonwebtoken";
import {
  responseAPI,
  recipesFormatter,
  recipeFormatter,
  commentsFormatter,
} from "../helper/responseFormatter.js";
import commentModel from "../models/commentModel.js";
import {
  MinioClient,
  uploadFile,
  removeFile,
} from "../helper/objectStorage.js";
import { generateRandomString } from "../helper/resetPassword.js";

const { create, fetchAll, fetchById, upadte, remove, fetchByUserId } =
  recipeModel;

const recipeController = {
  save: (req, res) => {
    res.json({ file: req.file.path, text: req.body });
  },

  addRecipe: async (req, res) => {
    const { title, ingredients, category_id, video_url } = req.body;
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(400).json({ msg: "g ada refreshToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const image_url = generateRandomString(10);
      uploadFile(req.file.path, image_url);

      const presignedUrl = await MinioClient.presignedGetObject(
        "foodimages",
        image_url
      );

      await create(
        user.payload.id,
        title,
        ingredients,
        category_id,
        presignedUrl,
        video_url
      );

      const data = {
        data: req.body,
        image: presignedUrl,
      };

      res
        .status(201)
        .json(responseAPI("berhasil menambahkan resep baru", data));
    } catch (error) {
      res.status(400).json({ msg: "gagal tambah resep!", error });
    }
  },

  listRecipe: async (req, res) => {
    const { title, category, perPage, page } = req.query;
    try {
      const recipes = await fetchAll(title, category, perPage, page);
      const data = recipesFormatter(recipes);
      res.status(200).json(responseAPI("list recipes", data));
    } catch (error) {
      res.status(400).json({ msg: "gagal mengambil resep!", error });
    }
  },

  recipe: async (req, res) => {
    const { recipe_id } = req.params;
    try {
      const recipe = await fetchById(parseInt(recipe_id));
      const komentar = await commentModel.fetchByRecipeId(parseInt(recipe_id));
      const cmnts = commentsFormatter(komentar);
      const data = recipeFormatter(recipe[0], cmnts)
      if (!recipe) {
        res.status(404).json(responseAPI("data tidak ditemukan", data));
      } else {
        res.status(200).json(responseAPI("berhasil mendapatkan data", data));
      }
    } catch (error) {
      res.status(400).json({ msg: "gagal mengambil resep!", error });
    }
  },

  updateRecipe: async (req, res) => {
    const { recipe_id } = req.params;
    const { title, ingredients, category_id, image_url, video_url } = req.body;

    try {
      await upadte(
        recipe_id,
        title,
        ingredients,
        category_id,
        image_url,
        video_url
      );
      res
        .status(202)
        .json(responseAPI("berhasil memperbaharui resep", req.body));
    } catch (error) {
      res.status(400).json({ msg: "gagal update resep!", error });
    }
  },

  removeRecipe: async (req, res) => {
    const { recipe_id } = req.params;

    try {
      await remove(recipe_id);
      res.status(200).json(responseAPI("berhasil menghapus resep"));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },

  myRecipes: async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(400).json({ msg: "g ada refreshToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const recipes = await fetchByUserId(user.payload.id);
      const data = recipesFormatter(recipes);
      res.status(200).json(responseAPI("list recipes", data));
    } catch (error) {
      res.status(400).json({ msg: "gagal mengambil resep!", error });
    }
  },

  // uploadFile: async (req, res) => {
  //   res.send(req.file);
  //   const objectName = req.file.originalname.split(".")[0];

  //   const objectName = generateRandomString(10);
  //   fs.readFile(req.file.path, function (err, data) {
  //     if (err) {
  //       return res.send(err);
  //     }
  //     const metaData = {
  //       "Content-Type": "image/png, image/jpg, image/jpeg", // sesuaikan dengan jenis file gambar
  //     };
  //     MinioClient.putObject(
  //       "foodimages",
  //       "default",
  //       data,
  //       metaData,
  //       function (err, etag) {
  //         if (err) {
  //           return res.send(err);
  //         }
  //         res.json({ isUploaded: true, etag });
  //       }
  //     );
  //   });
  // },
};

export default recipeController;
