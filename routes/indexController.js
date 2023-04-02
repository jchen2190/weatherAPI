const axios = require("axios");

let latitude = "40.71";
let longitude = "-74.01";
let city = "";
let query = "New York";
let cityName = "New York City";
let cityState = "New York"

async function getWeather(req, res) {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var amOrPm = "";
    if (min < 10) { min = "0" + min }
    var time = `${hr}:${min}`;
    hr < 12 ? amOrPm = "am" : amOrPm = "pm";
    if (hr > 12) { hr -= 12 }
    var currentTime = `${hr}:${min}`;
    
    if (req.query["search-city"] != "" && query != undefined) {
        query = req.query["search-city"];
    }

    try {
        city = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&language=en&count=10&format=json`)
        if (city.data.results != undefined) {
            latitude = city.data.results[0].latitude;
            longitude = city.data.results[0].longitude;
            cityName = city.data.results[0].name;
            cityState = city.data.results[0].admin1;
        }
        let weatherApp = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York`)
        let weatherForecastHr = weatherApp.data.hourly.time
        let currentTemp = Math.round(weatherApp.data.hourly.temperature_2m[0]);
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
        let sunriseAmOrPm;
        sunriseHr < 12 ? sunriseAmOrPm = " am" : sunriseAmOrPm = " pm";
        if (sunriseHr > 12) { sunriseHr -= 12 };
        if (sunriseMin < 10) { sunriseMin = "0" + sunriseMin };
        let sunsetDate = new Date(weatherApp.data.daily.sunset[0] * 1000);
        let sunsetHr = sunsetDate.getHours();
        let sunsetMin = sunsetDate.getMinutes();
        let sunset = sunsetHr + ":" + sunsetMin;
        let sunsetAmOrPm;
        sunsetHr < 12 ? sunsetAmOrPm = " am" : sunsetAmOrPm = " pm";
        if (sunsetHr > 12) { sunsetHr -= 12 };
        if (sunsetMin < 10){ sunsetMin = "0" + sunsetMin };

        res.render("home", {
            time: time,
            currentTime: currentTime,
            amOrPm: amOrPm,
            temp: currentTemp,
            hours: weatherForecastHr,
            tempSymbol: tempSymbol,
            cloudCover: cloudCover,
            cityName: cityName, cityState: cityState,
            highTemp: highTemp,
            lowTemp: lowTemp,
            windSpeed: windSpeed,
            humidity: humidity,
            dewPoint: dewPoint,
            visibility: visibility,
            sunriseHr: sunriseHr, sunriseMin: sunriseMin, sunriseAmOrPm: sunriseAmOrPm, sunrise: sunrise, 
            sunsetHr: sunsetHr, sunsetMin: sunsetMin, sunsetAmOrPm: sunsetAmOrPm, sunset: sunset,
        })
    } catch (error) {
        let errorObj = {
            message: "failure to find city or weather",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getWeather
}