import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const DB = new pg.Pool({
  host: process.env.POSTGRESQL_HOST,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  port: process.env.POSTGRESQL_PORT,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

export default DB;
