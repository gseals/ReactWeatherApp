import React, { useState } from 'react';
import apiKeys from './helpers/apiKeys.json';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${apiKeys.weatherAppKeys.databaseURL}weather?q=${query}&units=imperial&APPID=${apiKeys.weatherAppKeys.apiKey}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? 
    ((weather.main.temp > 60)
      ? 'app warm'
      : 'app')
    : 'app'}>
      <main>
        <div className="search-box">
          <input type="text"
          className="search-bar"
          placeholder="Search by city name..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
          {(typeof weather.main != "undefined") ? (
          <div>
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">Latitue and Longitude: {weather.coord.lat}, {weather.coord.lon}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
              <div className="temp">
                  {Math.round(weather.main.temp)}°F
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
