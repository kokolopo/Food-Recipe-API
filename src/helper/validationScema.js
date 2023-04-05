import Joi from "joi";

export const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(11).required(),
  password: Joi.string().min(8).required(),
  confPassword: Joi.any().valid(Joi.ref("password")).required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const resetPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

export const changePasswordSchema = Joi.object().keys({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
  confPassword: Joi.any().valid(Joi.ref("newPassword")).required(),
});

export const addRecipeSchema = Joi.object().keys({
  title: Joi.string().required(),
  ingredients: Joi.string().required(),
  category_id: Joi.number().required(),
});

export const addCommentSchema = Joi.object().keys({
  comment: Joi.string().required(),
});
