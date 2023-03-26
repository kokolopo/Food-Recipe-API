import express from "express";
import commentController from "../controllers/commentController.js";
import recipeController from "../controllers/recipeController.js";
import savedRecipeController from "../controllers/savedRecipesController.js";
import userController from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const { register, login, resetPassword, editProfile, refreshToken, logout } =
  userController;
const { addRecipe, listRecipe, recipe, updateRecipe, removeRecipe } =
  recipeController;
const { listSaved, saved } = savedRecipeController;
const { addComment, recipeComments } = commentController;

const router = express.Router();

router.post("/users", register);
router.post("/login", login);
router.put("/users", verifyToken, editProfile);
router.post("/reset-password", resetPassword);
router.get("/token", refreshToken);
router.delete("/logout", logout);

router.post("/recipes", verifyToken, addRecipe);
router.get("/recipes", verifyToken, listRecipe);
router.get("/recipes/:recipe_id", verifyToken, recipe);
router.put("/recipes/:recipe_id", verifyToken, updateRecipe);
router.delete("/recipes/:recipe_id", verifyToken, removeRecipe);

router.post("/saved/:recipe_id", verifyToken, saved);
router.get("/saved", verifyToken, listSaved);

router.post("/comments", verifyToken, addComment);
router.get("/comments/:recipe_id", verifyToken, recipeComments);

export default router;
