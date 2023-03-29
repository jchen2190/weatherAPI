const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        let weatherApp = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch")

        let currentTime = weatherApp.data.hourly.time[0];
        let currentTemp = weatherApp.data.hourly.temperature_2m[0];

        res.render("home", {time: currentTime, temp: currentTemp})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;