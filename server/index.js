const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
// const cors = require("cors");
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
  try {
    const { cities } = req.body;
    console.log("HEYYY");
    console.log(cities);
    const weatherData = {};

    // Fetch weather data for each city
    for (const city of cities) {
      const formattedCity = city.trim().toLowerCase().replace(" ", "+");
      const apiRes = await axios.request({
        method: "GET",
        url: `https://open-weather13.p.rapidapi.com/city/${formattedCity}`,
        headers: {
          "X-RapidAPI-Key":
            "2d067bedbbmsh9dfcb9607842411p164b03jsn566de3609656",
          "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
        },
      });
      //   console.log(apiRes.data);
      const temp = convert(apiRes.data.main.temp);
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
