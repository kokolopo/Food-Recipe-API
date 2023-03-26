import DB from "../config/db.js";

const userModel = {
  create: (uuid, name, email, phone, password) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO food_recipes.users (uuid, name, email, phone, password, image_url) 
          VALUES ('${uuid}', '${name}','${email}','${phone}','${password}','image_url')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM food_recipes.users WHERE email = '${email}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows[0]);
        }
      );
    });
  },

  findByToken: (token) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM food_recipes.users WHERE refresh_token = '${token}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows[0]);
        }
      );
    });
  },

  updatePhoto: (id, imageUrl) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE food_recipes.users SET image_url = '${imageUrl}' WHERE id = '${id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  updatePassword: (id, newPassword) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE food_recipes.users SET password = '${newPassword}', updated_at = now() WHERE id = '${id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  updateProfile: (id, name, email, phone) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE food_recipes.users SET name = '${name}', email = '${email}', phone = '${phone}', updated_at = now() WHERE id = '${id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  updateToken: (id, token) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE food_recipes.users SET refresh_token = '${token}', updated_at = now() WHERE id = '${id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};

export default userModel;
