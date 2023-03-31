const axios = require("axios");

let latitude = "40.71";
let longitude = "-74.01";

async function getWeather(req, res) {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var amOrPm = "";
    if (hr < 12) {
        amOrPm = "am"
    } else {
        amOrPm = "pm"
    }
    if (hr > 12) { hr -= 12 }
    // if (hr < 10) { hr = "0" + hr }
    if (min < 10) { min = "0" + min }
    var currentTime = `${hr}:${min} ${amOrPm}`;

    let query = req.query.search;
    try {
        // if (query != "") {
        //     let city = await axios.get(`https://api.api-ninjas.com/v1/city?name=${query}`)
        //     latitude = city.data.latitude + ""
        //     longitude = city.data.longitude + ""
        // }

        let weatherApp = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility&daily=temperature_2m_max,temperature_2m_min,precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York`)
        let weatherForecastHr = weatherApp.data.hourly.time
        let currentTemp = weatherApp.data.hourly.temperature_2m[0];
        let tempSymbol = weatherApp.data.hourly_units.apparent_temperature;
        let cloudCover = weatherApp.data.hourly.cloudcover[0]; 
        console.log(cloudCover);

        res.render("home", {
            time: currentTime,
            temp: currentTemp,
            hours: weatherForecastHr,
            tempSymbol: tempSymbol,
            cloudCover: cloudCover
        })
    } catch (error) {
        let errorObj = {
            message: "failure to find weather",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getWeather
}