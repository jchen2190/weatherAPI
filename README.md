# WeatherAPI
![screenshot](/public/screenshot.png)

## General Info

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
- EJS - v3.1.9
- Express - v4.18.2
- Morgan - v1.10.0
- Nodemon - v2.0.22

You can run the application by typing the following in the command line:
```
node index.js
```
The port will be on <b>localhost:3000</b>. Type in the URL to access content.<br>
<br>

## Technologies
Uses Javascript & NodeJS.
The application uses express and axios and takes the API of cities from open-meteo at [Geocoding API](https://open-meteo.com/en/docs/geocoding-api) and takes the values of the cities to find the weather from open-meteo: [Weather Forecast API](https://open-meteo.com/en/docs#api_form).