const express = require("express");
const router = express.Router();

const {
    getWeather,
} = require("./indexController");

router.get("/", getWeather);

module.exports = router;