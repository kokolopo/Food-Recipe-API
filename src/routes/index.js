import express from "express";
import commentController from "../controllers/commentController.js";
import recipeController from "../controllers/recipeController.js";
import savedRecipeController from "../controllers/savedRecipesController.js";
import userController from "../controllers/userController.js";
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  addRecipeSchema,
  addCommentSchema,
  changePasswordSchema,
} from "../helper/validationScema.js";
import { validate } from "../middleware/validation.js";
import {
  verifyToken,
  isAdmin,
  isUser,
  isOwner,
} from "../middleware/verifyToken.js";
import { uploadImages } from "../middleware/uploadImage.js";
import checkRedis from "../middleware/redisCache.js";

const {
  register,
  login,
  resetPassword,
  editProfile,
  refreshToken,
  logout,
  uploadPhoto,
  listUsers,
  findById,
  changePassword,
} = userController;
const {
  addRecipe,
  listRecipe,
  recipe,
  updateRecipe,
  removeRecipe,
  save,
  myRecipes,
} = recipeController;
const { listSaved, saved } = savedRecipeController;
const { addComment, recipeComments, listComments } = commentController;

const router = express.Router();

//test
router.post("/save", uploadImages.single("image"), save);

// redis
router.get("/users/:id", checkRedis, isAdmin, findById);

// user & auth
router.get("/users", isAdmin, listUsers);
router.post("/users", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.put("/users", verifyToken, editProfile);
router.post("/images", uploadImages.single("image"), uploadPhoto);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.put(
  "/passwords",
  validate(changePasswordSchema),
  verifyToken,
  changePassword
);
router.get("/token", refreshToken);
router.delete("/logout", logout);

// recipes
router.post(
  "/recipes",
  uploadImages.single("image"),
  validate(addRecipeSchema),
  verifyToken,
  addRecipe
);
router.get("/recipes", listRecipe);
router.get("/recipes/:recipe_id", recipe);
router.put("/recipes/:recipe_id", isOwner, updateRecipe);
router.delete("/recipes/:recipe_id", isOwner, removeRecipe);
router.get("/myrecipes", myRecipes);

// saved
router.post("/saved/:recipe_id", verifyToken, saved);
router.get("/saved", verifyToken, listSaved);

// comments
router.post(
  "/comments/:recipe_id",
  validate(addCommentSchema),
  verifyToken,
  addComment
);
router.get("/comments/:recipe_id", verifyToken, recipeComments);
router.get("/comments", isAdmin, listComments);

export default router;
