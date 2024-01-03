import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [res, setRes] = useState(null);

  const handleButtonClick = async (e) => {
    e.preventDefault();

    try {
      const cities = inputValue.split(",");
      console.log(cities);
      const response = await fetchWeatherData(cities);
      setRes(response);
      setShowRes(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherData = async (cities) => {
    try {
      const response = await fetch("http://localhost:5000/getWeather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cities }),
      });

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
      {showRes && <div>{JSON.stringify(res)}</div>}
    </div>
  );
}

export default App;
