import DB from "../config/db.js";

const recipeModel = {
  create: (user_id, title, ingredients, category_id, image_url, video_url) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO recipes (user_id, title, ingredients, category_id, image_url, video_url) 
        VALUES ('${user_id}', '${title}','${ingredients}','${category_id}','${image_url}','${video_url}')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  fetchAll: (title = "", category = "", perPage = "", page = "") => {
    const offset = (page - 1) * perPage;
    let query =
      `SELECT r.*, c.category_name, u.name 
      FROM recipes r 
      LEFT JOIN categories c ON r.category_id = c.id
      LEFT JOIN users u ON r.user_id = u.id `;

    if (title !== "") query += `WHERE r.title LIKE '%${title}%'`;
    if (category !== "") query += `WHERE r.category_id = '${category}'`;
    if (perPage !== "" && page !== "")
      query += `limit ${perPage} offset ${offset}`;

    // console.log(query);
    return new Promise((resolve, reject) => {
      DB.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result.rows);
      });
    });
  },

  fetchById: (recipe_id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT r.*, c.category_name, u.name
        FROM recipes r
        LEFT JOIN categories c ON r.category_id = c.id
        LEFT JOIN users u ON r.user_id = u.id
        WHERE r.id = ${recipe_id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  fetchByUserId: (user_id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM recipes WHERE user_id = ${user_id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  upadte: (
    recipe_id,
    title,
    ingredients,
    category_id,
    image_url,
    video_url
  ) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE recipes SET title = '${title}', ingredients = '${ingredients}', category_id = '${category_id}', image_url = '${image_url}', video_url = '${video_url}', updated_at = now() 
        WHERE id = ${recipe_id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  remove: (recipe_id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `DELETE FROM recipes WHERE id = ${recipe_id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};

export default recipeModel;

// SELECT * FROM recipes ORDER BY liked DESC LIMIT 6
