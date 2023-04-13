const axios = require("axios");

let latitude = "40.71";
let longitude = "-74.01";
let city = "";
let query = "New York";
let cityName = "New York";
let cityState = "New York";

async function getWeather(req, res) {
    if (req.query !== "") {
        query = req.query["search-city"];
    }
    
    try {
        city = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&language=en&count=10&format=json`)
        if (city.data.results) {
            latitude = city.data.results[0].latitude;
            longitude = city.data.results[0].longitude;
            cityName = city.data.results[0].name;
            cityState = city.data.results[0].admin1;
        }
        let weatherApp = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=auto`)

        var now = new Date;
        var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        let date = new Date();
        let hr = date.getHours();
        let min = date.getMinutes();
        if (min < 10) { min = "0" + min }
        let amOrPm = "";
        let time;
        if (hr < 10) { time = "0" + hr + ":" + min} else { time = hr + ":" + min}
        hr < 12 ? amOrPm = "am" : amOrPm = "pm";
        let hour = hr; // use hr as variable below
        let utcOffset = weatherApp.data.utc_offset_seconds / 60 / 60;
        // hour += utcOffset + 2;
        console.log(now.getUTCHours());
        console.log(hour);
        if (hour > 12) { hour -= 12 }
        if (hour === 0) { hour += 12}
        let currentTime = `${hour}:${min}`;

        let weatherHr = weatherApp.data.hourly
        let weatherDaily = weatherApp.data.daily;
        let currentTemp = Math.round(weatherHr.temperature_2m[hr]);
        let cloudCover = weatherHr.cloudcover[hr];
        let highTemp = weatherDaily.temperature_2m_max[0];
        let lowTemp = weatherDaily.temperature_2m_min[0];

        let precipitation = weatherHr.precipitation[hr];
        let rain = weatherHr.rain[hr];
        let showers = weatherHr.showers[hr];
        let snowfall = weatherHr.snowfall[hr];

        let windSpeed = weatherHr.windspeed_10m[hr] + " mph";
        let humidity = weatherHr.relativehumidity_2m[hr] + "%";
        let dewPoint = weatherHr.dewpoint_2m[hr] + "°";
        let visibility = Math.floor(weatherHr.visibility[hr] / 5280);
        if (visibility > 10) { visibility = 10 };
        visibility += " mi";

        let sunriseDate = new Date(weatherDaily.sunrise[0] * 1000);
        let sunriseHr = sunriseDate.getHours();
        let sunriseMin = sunriseDate.getMinutes();
        let sunriseAmOrPm;
        sunriseHr < 12 ? sunriseAmOrPm = " am" : sunriseAmOrPm = " pm";
        if (sunriseMin < 10) { sunriseMin = "0" + sunriseMin };
        let sunrise;
        sunrise = sunriseHr < 10 ? "0" + sunriseHr + ":" + sunriseMin : sunriseHr + ":" + sunriseMin;
        if (sunriseHr > 12) { sunriseHr -= 12 };

        let sunsetDate = new Date(weatherDaily.sunset[0] * 1000);
        let sunsetHr = sunsetDate.getHours();
        let sunsetMin = sunsetDate.getMinutes();
        let sunsetAmOrPm;
        sunsetHr < 12 ? sunsetAmOrPm = " am" : sunsetAmOrPm = " pm";
        if (sunsetMin < 10) { sunsetMin = "0" + sunsetMin };
        let sunset;
        sunset = sunsetHr < 10 ? "0" + sunsetHr + ":" + sunsetMin : sunsetHr + ":" + sunsetMin;
        if (sunsetHr > 12) { sunsetHr -= 12 };

        res.render("home", {
            time: time, hr: hr, currentTime: currentTime, amOrPm: amOrPm,
            temp: currentTemp,
            weatherHr: weatherHr, weatherDaily: weatherDaily,
            cloudCover: cloudCover,
            precipitation: precipitation, rain: rain, showers: showers, snowfall: snowfall,
            cityName: cityName, cityState: cityState,
            highTemp: highTemp, lowTemp: lowTemp,
            windSpeed: windSpeed, humidity: humidity, dewPoint: dewPoint, visibility: visibility,
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