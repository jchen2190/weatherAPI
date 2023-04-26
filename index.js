const express = require("express");
const app = express();
require("dotenv").config();
const logger = require("morgan");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(logger("dev"));

const weatherRouter = require("./routes/indexRouter");
app.use("/", weatherRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})