const axios = require("axios");

async function getWeather(req, res) {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var amOrPm = "";
    if (hr < 13) {
        amOrPm = "am"
    } else {
        amOrPm = "pm"
    }
    if (hr > 13) { hr -= 12 }
    if (hr < 10) { hr = "0" + hr }
    if (min < 10) { min = "0" + min }
    var currentTime = `${hr}:${min} ${amOrPm}`;
    try {
        let weatherApp = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,cloudcover,visibility&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime")
        let weatherForecastHr = weatherApp.data.hourly.time
        let currentTemp = weatherApp.data.hourly.temperature_2m[0];

        res.render("home", {time: currentTime, temp: currentTemp, hours: weatherForecastHr})
    } catch (error) {
        let errorObj = {
            message: "failure to find weather",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

// async function getCity(req, res) {
//     try {
//         let cityApp = await axios.get(`https://api.api-ninjas.com/v1/city?name=${cityName}`)
//         console.log(cityApp);
//         getWeather();
//     } catch (error) {
//         let errorObj = {
//             message: "failure to find city",
//             payload: error
//         }
//         console.log(errorObj);
//         res.json(errorObj);
//     }
// }

module.exports = {
    getWeather
}