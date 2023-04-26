# WeatherAPI
![screenshot](/public/screenshot2.png)

## General Info
This weather application displays a city's current, hourly and daily forecast with variables. Type in a name of a city to get the time and forecast of that location.

## Setup

### Node Installation
Go to [Official Node.js Website](https://nodejs.org) and download the installer per your operating system.

### Run
After node is installed, install the modules by running the following commands in the terminal to install package dependencies.
```
npm install
```
Dependencies that will be installed:<br>
- Axios - v1.3.4
- dotenv - v16.0.3
- EJS - v3.1.9
- Express - v4.18.2
- Morgan - v1.10.0
- Nodemon - v2.0.22

Create file `.env` and type in the file:
```
PORT = 3000
```
You can run the application by typing the following in the command line:
```
node index.js
```
<br>

## Technologies
Uses EJS, Javascript & NodeJS.
The application uses express and axios and takes the API of cities from open-meteo at [Geocoding API](https://open-meteo.com/en/docs/geocoding-api) and takes the values of the cities to find the weather from open-meteo: [Weather Forecast API](https://open-meteo.com/en/docs#api_form).

## Deployment
Check out the app at [https://weatherapp-2dyu.onrender.com/](https://weatherapp-2dyu.onrender.com/)