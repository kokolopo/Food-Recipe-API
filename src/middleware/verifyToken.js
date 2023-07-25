import jwt from "jsonwebtoken";
import recipeModel from "../models/recipeModel.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;

    next();
  });
};

export const isAdmin = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;

    if (decoded.role !== "admin") return res.sendStatus(403);
    next();
  });
};

export const isUser = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;

    if (decoded.role !== "user") return res.sendStatus(403);
    next();
  });
};

export const isOwner = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  recipeModel
    .fetchById(req.params.recipe_id)
    .then((result) => {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403);
        if (decoded.id !== result[0].user_id) {
          return res.sendStatus(403);
        }

        next();
      });
    })
    .catch((err) => {
      return res.sendStatus(403).json(err);
    });
};
