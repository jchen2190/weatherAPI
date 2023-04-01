const axios = require("axios");

let latitude = "40.71";
let longitude = "-74.01";

async function getWeather(req, res) {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var amOrPm = "";
    hr < 12 ? amOrPm = "am" : amOrPm = "pm";
    if (hr > 12) { hr -= 12 }
    if (min < 10) { min = "0" + min }
    var currentTime = `${hr}:${min} ${amOrPm}`;

    let query = req.query.search;
    try {
        // if (query != "") {
        //     let city = await axios.get(`https://api.api-ninjas.com/v1/city?name=${query}`)
        //     latitude = city.data.latitude + ""
        //     longitude = city.data.longitude + ""
        // }

        let weatherApp = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York`)
        let weatherForecastHr = weatherApp.data.hourly.time
        let currentTemp = weatherApp.data.hourly.temperature_2m[0];
        let tempSymbol = weatherApp.data.hourly_units.apparent_temperature;
        let cloudCover = weatherApp.data.hourly.cloudcover[0];
        let highTemp = weatherApp.data.daily.temperature_2m_max[0];
        let lowTemp = weatherApp.data.daily.temperature_2m_min[0];

        let windSpeed = weatherApp.data.hourly.windspeed_10m[0] + " mph";
        let humidity = weatherApp.data.hourly.relativehumidity_2m[0] + "%";
        let dewPoint = weatherApp.data.hourly.dewpoint_2m[0] + "°";

        let visibility = Math.floor(weatherApp.data.hourly.visibility[0] / 5280);
        if (visibility > 10) { visibility = 10 };
        visibility += " mi";

        let sunriseDate = new Date(weatherApp.data.daily.sunrise[0] * 1000);
        let sunriseHr = sunriseDate.getHours();
        let sunriseMin = sunriseDate.getMinutes();
        let sunrise = sunriseHr + ":" + sunriseMin;
        sunriseHr < 12 ? sunrise += " am" : sunrise += " pm";
        let sunsetDate = new Date(weatherApp.data.daily.sunset[0] * 1000);
        let sunsetHr = sunsetDate.getHours();
        let sunsetMin = sunsetDate.getMinutes();
        let sunsetAmOrPm;
        sunsetHr < 12 ? sunsetAmOrPm = " am" : sunsetAmOrPm = " pm";
        if (sunsetHr > 13) { sunsetHr -= 12 }
        let sunset = sunsetHr + ":" + sunsetMin + sunsetAmOrPm;

        res.render("home", {
            time: currentTime,
            temp: currentTemp,
            hours: weatherForecastHr,
            tempSymbol: tempSymbol,
            cloudCover: cloudCover,
            highTemp: highTemp,
            lowTemp: lowTemp,
            windSpeed: windSpeed,
            humidity: humidity,
            dewPoint: dewPoint,
            visibility: visibility,
            sunrise: sunrise,
            sunset: sunset,
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