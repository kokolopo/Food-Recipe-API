const express = require("express");
const commentController = require("../controllers/commentController.js");
const recipeController = require("../controllers/recipeController.js");
const savedRecipeController = require("../controllers/savedRecipesController.js");
const userController = require("../controllers/userController.js");
const {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  addRecipeSchema,
  addCommentSchema,
  changePasswordSchema,
} = require("../helper/validationScema.js");
const { validate } = require("../middleware/validation.js");
const {
  verifyToken,
  isAdmin,
  isUser,
  isOwner,
} = require("../middleware/verifyToken.js");
const { uploadImages } = require("../middleware/uploadImage.js");
const checkRedis = require("../middleware/redisCache.js");

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
