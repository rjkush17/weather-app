import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSun, faCloud,faSmog, faCloudRain, faSnowflake, faThunderstorm, faWind } from "@fortawesome/free-solid-svg-icons";
import "./WeatherApp.css";



function getWeatherIcon(weatherDescription) {
  switch (weatherDescription.toLowerCase()) {
    case 'clear sky':
      return <FontAwesomeIcon icon={faSun} />;
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
    case 'overcast clouds':
      return <FontAwesomeIcon icon={faCloud} />;
    case 'light rain':
    case 'moderate rain':
    case 'heavy intensity rain':
    case 'very heavy rain':
    case 'extreme rain':
      return <FontAwesomeIcon icon={faCloudRain} />;
    case 'snow':
      return <FontAwesomeIcon icon={faSnowflake} />;
    case 'thunderstorm':
      return <FontAwesomeIcon icon={faThunderstorm} />;
    case 'wind':
      return <FontAwesomeIcon icon={faWind} />;
    case 'haze':
      return <FontAwesomeIcon icon={faSmog} />;
    default:
      return null; // You can return a default icon for unknown weather conditions
  }
}




function WeatherApp() {
  const [temp, setTemp] = useState(null);
  const [search, setSearch] = useState("mumbai");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [rh, setRh] = useState("");
  const [visibility, setVisibility] = useState("");
  const [wind, setWind] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b3e82c676c179affedeab95479ef2100`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("City not found");
        }

        const resJson = await response.json();
        const ctemp = resJson.main.temp - 273.15;
        setTemp(ctemp.toFixed(1));
        setWeather(resJson.weather[0].description);
        setCity(resJson.name);
        setCountry(resJson.sys.country);
        setRh(resJson.main.humidity);
        setVisibility(resJson.visibility);
        setWind(resJson.wind.speed);
        setError(null);
      } catch (err) {
        setError("City not found");
      }
    };
    fetchApi();
  }, [search]);

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleClick() {
    setSearch(inputValue);
    setInputValue("");
  }
  function handleTryAgain() {
    setError(null);
    setSearch(inputValue);
  }


  if (!weather) {
    return "Loading....";
  } else if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button className="try-again" onClick={handleTryAgain}>
          Try Again
        </button>
      </div>
    );
  } else {
    return (
      <div className="weather-container">
        <div className="weather-icon">
          {getWeatherIcon(weather)}
        </div>
        <h1>{weather}</h1>

        <div className="input-container">
          <input
            type="text"
            className="input-field"
            value={inputValue}
            onChange={handleInput}
          />
          <button className="search-button" onClick={handleClick}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <hr />

        <h3 className="city-country">
          {city}, {country}
        </h3>
        <hr />

        <div className="weather-data">
          <table>
            <tbody>
              <tr>
                <td>Temp</td>
                <td>{temp}°C</td>
              </tr>
              <tr>
                <td>RH</td>
                <td>{rh}%</td>
              </tr>
              <tr>
                <td>Visibility</td>
                <td>{visibility}ms</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{wind}km/h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WeatherApp;
