import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const API_KEY = "ee8971184f745c6ac3f9aebaf625d9a7"; 
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeather(data);
      setError("");
    } catch {
      setWeather(null);
      setError("City not found!");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">Weather Finder</h1>

        <div className="input-group">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="city-input"
          />
          <button onClick={fetchWeather} className="fetch-btn">
            Get Weather
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
            <div className="weather-description">
              <p>{weather.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
              />
            </div>
            <div className="weather-stats">
              <p><strong>Temperature:</strong> {Math.round(weather.main.temp - 273.15)}°C</p>
              <p><strong>Feels Like:</strong> {Math.round(weather.main.feels_like - 273.15)}°C</p>
              <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
              <p><strong>Wind Speed:</strong> {weather.wind.speed} km/h</p>
            </div>
            <div className="additional-info">
              <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
              <p><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
