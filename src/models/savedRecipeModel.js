import DB from "../config/db.js";

const savedRecipeModel = {
  create: (recipe_id, user_id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO food_recipes.saved_recipes (recipe_id, user_id) VALUES ('${recipe_id}', '${user_id}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  fetchAll: (user_id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT s.*, r.*, c.category_name
      FROM food_recipes.saved_recipes s
      INNER JOIN food_recipes.recipes r ON s.recipe_id = r.id
      INNER JOIN food_recipes.categories c ON r.category_id = c.id 
      WHERE s.user_id = ${user_id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  fetchByRecipeId: (recipe_id, user_id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `select * from food_recipes.saved_recipes where recipe_id = '${recipe_id}' and user_id = '${user_id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  //   remove: (id) => {
  //     return new Promise((resolve, reject) => {
  //       DB.query(
  //         `DELETE FROM food_recipes.saved_recipes WHERE id = ${id}`,
  //         (err, result) => {
  //           if (err) reject(err);
  //           resolve(result);
  //         }
  //       );
  //     });
  //   },
};

export default savedRecipeModel;
