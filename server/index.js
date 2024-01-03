const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;
const WEATHER_API_ENDPOINT = "https://open-weather13.p.rapidapi.com";
app.use(bodyParser.json());
// app.use(cors());

function convert(f) {
  return (((f - 32) * 5) / 9).toFixed(2);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/getWeather", async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  try {
    const { cities } = req.body;
    // console.log("HEYYY");
    if (!cities) throw new Error("Please provide cities");
    console.log(cities);
    const weatherData = {};
    // console.log("reached");

    // Fetch weather data for each city
    for (const city of cities) {
      const formattedCity = city.trim().toLowerCase().replace(" ", "+");
      const apiRes = await axios.request({
        method: "GET",
        url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
        params: {city: formattedCity},
        headers: {
          'X-RapidAPI-Key': '2d067bedbbmsh9dfcb9607842411p164b03jsn566de3609656',
          'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
      });
        console.log(apiRes, formattedCity);
      const temp = convert(apiRes.temp);
      console.log("Temperature in Celsius:", temp, formattedCity);
      weatherData[city] = `${temp} °C`;
    }
    // res.json({ weather: weatherData });
    return res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
