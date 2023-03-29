const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        // let cityLocation = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city-name},${state-code},${country-code}&limit=5&appid=${API-key}`)

        let weatherApp = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,precipitation_probability&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York")

        let currentTime = weatherApp.data.hourly.time[0];
        let currentTemp = weatherApp.data.hourly.temperature_2m[0];

        res.render("home", {time: currentTime, temp: currentTemp})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;