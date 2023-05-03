import DB from "../config/db.js";

const userModel = {
  create: (uuid, name, email, phone, password) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO users (uuid, name, email, phone, password, image_url, role) 
          VALUES ('${uuid}', '${name}','${email}','${phone}','${password}','default', 'user')`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM food_recipes.users WHERE id = ${id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows[0]);
        }
      );
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      DB.query(
        "SELECT uuid, name, email, phone, image_url, role FROM food_recipes.users",
        (err, result) => {
          if (err) reject(err);
          resolve(result.rows);
        }
      );
    });
  },

  findByEmail: (email) => {
    // return new Promise((resolve, reject) => {
    //   DB.query(
    //     `SELECT * FROM food_recipes.users WHERE email = '${email}'`,
    //     (err, result) => {
    //       if (err) reject(err);
    //       resolve(result.rows[0]);
    //     }
    //   );
    // });

    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM users WHERE email = '${email}'`,
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

  updatePhoto: (refreshToken, imageUrl) => {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE food_recipes.users SET image_url = '${imageUrl}' WHERE refresh_token = '${refreshToken}'`,
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
    // return new Promise((resolve, reject) => {
    //   DB.query(
    //     `UPDATE food_recipes.users SET refresh_token = '${token}', updated_at = now() WHERE id = '${id}'`,
    //     (err, result) => {
    //       if (err) reject(err);
    //       resolve(result);
    //     }
    //   );
    // });
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE users SET refresh_token = '${token}', updated_at = now() WHERE id = '${id}'`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};

export default userModel;
