import React, { useState, useEffect } from "react";
import axios from "axios";


const API_key = process.env.REACT_APP_API_KEY

const WeatherInfo = ({ capital, lat, lon }) => {
  const [data, setData] = useState(null);



  useEffect(() => {
    axios
      .get(
        (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=imperial`)
      )
      .then(response => {
        const data = response.data;
        console.log("response", data);
        setData(data);
      });
  }, [capital, lat, lon]);

  if (!data) {
    return null
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {data.main.temp} °F</p>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="weather icon" />
      <p>Wind speed: {data.wind.speed} mph</p>
    </div>
  );
};

export default WeatherInfo;
