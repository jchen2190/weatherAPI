const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
    try {
        // let weatherApp = await axios.get("")

        // let weatherArray = [];

        // res.render("home", {weather: weatherArray})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;