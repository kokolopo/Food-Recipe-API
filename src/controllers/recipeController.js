import recipeModel from "../models/recipeModel.js";
import jwt from "jsonwebtoken";
import {
  responseAPI,
  recipesFormatter,
  recipeFormatter,
  commentsFormatter,
} from "../helper/responseFormatter.js";
import commentModel from "../models/commentModel.js";

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
    const { title } = req.query;
    try {
      const recipes = await fetchAll(title);
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

  likedRecipe: async (req, res) => {},

  savedRecipe: async (req, res) => {},
};

export default recipeController;
