import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    const apiKey = "e2ddc982fa224d8dc48288a5f0fbe821";

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (response.status !== 200) {
        setError(data.message);
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(data);
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Something went wrong");
      setWeather(null);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🌤 Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>

          <p>🌡 Temperature: {weather.main.temp}°C</p>

          <p>💧 Humidity: {weather.main.humidity}%</p>

          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>

          <p>☁ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;