import { recipesFormatter, responseAPI } from "../helper/responseFormatter.js";
import recipeModel from "../models/recipeModel.js";
import savedRecipeModel from "../models/savedRecipeModel.js";
import jwt from "jsonwebtoken";

const { create, fetchAll, fetchByRecipeId } = savedRecipeModel;

const savedRecipeController = {
  saved: async (req, res) => {
    const { recipe_id } = req.params;

    const token = req.cookies.refreshToken;
    const user = jwt.decode(token, { complete: true });

    try {
      const recipe = await recipeModel.fetchById(recipe_id);
      if (!recipe) return res.sendStatus(404);

      const chek = await fetchByRecipeId(recipe_id, user.payload.id);
      if (chek) return res.sendStatus(400);

      await create(recipe_id, user.payload.id);
      // const data = recipesFormatter(recipe);
      return res.status(201).json(responseAPI("recipe saved", recipe));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },

  listSaved: async (req, res) => {
    const token = req.cookies.refreshToken;
    const user = jwt.decode(token, { complete: true });
    try {
      const recipes = await fetchAll(user.payload.id);
      const data = recipesFormatter(recipes);
      res.status(200).json(responseAPI("list of saved recipes", data));
    } catch (error) {
      res.status(500).json(responseAPI("server error", error));
    }
  },
};

export default savedRecipeController;
