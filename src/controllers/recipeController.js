import recipeModel from "../models/recipeModel.js";
import jwt from "jsonwebtoken";
import {
  responseAPI,
  recipesFormatter,
  recipeFormatter,
  commentsFormatter,
} from "../helper/responseFormatter.js";
import commentModel from "../models/commentModel.js";
import { MinioClient } from "../helper/objectStorage.js";
import fs from "fs";
import { generateRandomString } from "../helper/resetPassword.js";

const { create, fetchAll, fetchById, upadte, remove } = recipeModel;

const recipeController = {
  addRecipe: async (req, res) => {
    const { title, ingredients, category_id, image_url, video_url } = req.body;
    const token = req.cookies.refreshToken;
    const user = jwt.decode(token, { complete: true });
    try {
      await create(
        user.payload.id,
        title,
        ingredients,
        category_id,
        image_url,
        video_url
      );
      res
        .status(201)
        .json(responseAPI("berhasil menambahkan resep baru", req.body));
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
      const recipe = await fetchById(recipe_id);
      const komentar = await commentModel.fetchByRecipeId(recipe_id);
      const cmnts = commentsFormatter(komentar);
      const data = recipeFormatter(recipe, cmnts);
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
      res.status(400).json({ msg: "gagal tambah resep!", error });
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

  uploadFile: async (req, res) => {
    // res.send(req.file);
    // const objectName = req.file.originalname.split(".")[0];
    const objectName = generateRandomString(10);
    fs.readFile(req.file.path, function (err, data) {
      if (err) {
        return res.send(err);
      }
      const metaData = {
        "Content-Type": "image/png, image/jpg, image/jpeg", // sesuaikan dengan jenis file gambar
      };
      MinioClient.putObject(
        "foodimages",
        "default",
        data,
        metaData,
        function (err, etag) {
          if (err) {
            return res.send(err);
          }
          res.json({ isUploaded: true, etag });
        }
      );
    });
  },
};

export default recipeController;
