import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = 4000;

app.use(cors({ credentials: true, origin: "http://localhost:4000" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.listen(port, () => console.log(`serve on port: ${port}`));
