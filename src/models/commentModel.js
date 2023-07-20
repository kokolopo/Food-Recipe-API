import DB from "../config/db.js";

const commentModel = {
  create: (user_id, recipe_id, comment) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO comments (user_id, recipe_id, comment) VALUES ('${user_id}', ${recipe_id}, '${comment}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  fetchByRecipeId: (recipe_id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT k.*, u.name
        FROM comments k
        LEFT JOIN users u ON k.user_id = U.id
        where recipe_id = ${recipe_id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  fetchAll: () => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT u.name, c.*
        FROM comments c
        LEFT JOIN users u ON c.user_id = u.id`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },
};

export default commentModel;
