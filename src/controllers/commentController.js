const commentModel = require("../models/commentModel.js");
const jwt = require("jsonwebtoken");
const { responseAPI } = require("../helper/responseFormatter.js");

const { create, fetchByRecipeId, fetchAll } = commentModel;

const commentController = {
  addComment: async (req, res) => {
    const { recipe_id } = req.params;
    const { comment } = req.body;
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

  listComments: async (req, res) => {
    try {
      const comments = await fetchAll();
      res.status(200).json(responseAPI("daftar komentar", comments));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },
};

export default commentController;
