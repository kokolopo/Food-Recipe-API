const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./src/routes/index.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
dotenv.config();

const app = express();
const port = 4000;

app.use(cors({ credentials: true, origin: "http://localhost:8081" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(helmet());

app.listen(port, () => console.log(`serve on port: ${port}`));
