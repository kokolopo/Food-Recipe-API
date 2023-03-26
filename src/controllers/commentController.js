import commentModel from "../models/commentModel.js";
import jwt from "jsonwebtoken";
import { responseAPI } from "../helper/responseFormatter.js";

const { create, fetchByRecipeId } = commentModel;

const commentController = {
  addComment: async (req, res) => {
    const { comment, recipe_id } = req.body;
    const token = req.cookies.refreshToken;
    const user = jwt.decode(token, { complete: true });

    try {
      await create(user.payload.id, recipe_id, comment);
      res
        .status(201)
        .json(responseAPI("berhasil menambahkan komentar", comment));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },

  recipeComments: async (req, res) => {
    const { recipe_id } = req.params;
    try {
      const data = await fetchByRecipeId(recipe_id);
      res.status(200).json(responseAPI("data komentar", data));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },
};

export default commentController;
