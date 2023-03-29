// npm install express morgan ejs
// npm install nodemon
// add "start": "nodemon index.js"
// npm run start

const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(logger("dev"));

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is litening on port ${PORT}...`);
})