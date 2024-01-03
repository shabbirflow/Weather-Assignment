import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [res, setRes] = useState(null);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setShowRes(1);

    try {
      const cities = inputValue.split(",");
      setShowRes(1)
      const response = await fetchWeatherData(cities);
      setRes(JSON.stringify(response));
      setShowRes(2);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherData = async (cities) => {
    try {
      const cities = inputValue.split(",");
      // console.log(cities);

      // Make a POST request to the server with the list of cities
      const response = await fetch(
        "https://weather-assignment-server.vercel.app/getWeather",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // mode: "no-cors",
          body: JSON.stringify({ cities }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div>
      <h1>WEATHER APP</h1>
      <div>
        <form>
          <textarea
            placeholder="Enter names of cities separated by comma"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button disabled={inputValue.length < 3} onClick={handleButtonClick}>
            Get Weather
          </button>
        </form>
      </div>
      {showRes === 1 && <p>Loading...</p>}
      {showRes === 2 && <p>{res}</p>}
      {!showRes && <p>none</p>}
    </div>
  );
}

export default App;
