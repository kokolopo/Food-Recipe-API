import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);

app.get("/", (req, res) => {
  res.json({ msg: "gass ngoding kuyy!!!" });
});

app.listen(port, () => console.log(`serve on port: ${port}`));
