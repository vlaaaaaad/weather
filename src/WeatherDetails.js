import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './index.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

export default function WeatherDetails(props) {
  // const [city, setCity] = useState(sessionStorage.getItem("0"));
  const [city, setCity] = useState(props.location.city);
  const [updateTime, setUpdateTime] = useState(null);
  const [weatherData, setWeatherData] = useState({
  "coord": {
    "lon": 0,
    "lat": 0
  },
  "weather": [
    {
      "id": 0,
      "main": "",
      "description": "",
      "icon": ""
    }
  ],
  "base": "",
  "main": {
    "temp": 0,
    "feels_like": 0,
    "temp_min": 0,
    "temp_max": 0,
    "pressure": 0,
    "humidity": 0
  },
  "visibility": 0,
  "wind": {
    "speed": 0,
    "deg": 0
  },
  "clouds": {
    "all": 0
  },
  "dt": 0,
  "sys": {
    "type": 0,
    "id": 0,
    "message": 0,
    "country": "",
    "sunrise": 0,
    "sunset": 0
  },
  "timezone": 0,
  "id": 0,
  "name": "",
  "cod": 0
  });

  useEffect(() => {
    if(props.location.city) {
      // setCity(props.location.city);
      // sessionStorage.setItem("0", props.location.city);
      fetchWeather();
    }
  }, []);

  async function fetchWeather() {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
    city + "&lang=ru&units=metric&appid=5fc73283d7afc0b780eee68e8e3bb82b";
    const responce = await fetch(url);
    const data = await responce.json();
    setWeatherData(data);
    setUpdateTime(new Date().toLocaleTimeString());
  }

  const unixToDate = (timestamp) => {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours > 10 ? hours + ':' + minutes.substr(-2) : "0" + hours + ':' + minutes.substr(-2);
    return(formattedTime);
  };

  return (
    <div>
    <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
    <Button
      color="primary"
      size="large"
      startIcon={<ArrowBack />}
    >Назад
    </Button>
    </Link>
    <Typography variant="h3">{weatherData.name}</Typography>
    <table style={{width: "500px"}}>
	  <tbody>
    <tr>
    <td>Погодные условия</td>
    <td>{weatherData.weather[0].description.charAt(0).toUpperCase()
      + weatherData.weather[0].description.substring(1)}</td>
    </tr>
		<tr>
		<td>Температура</td>
		<td>{Math.round(weatherData.main.temp)} °С</td>
		</tr>
    <tr>
		<td>Ощущается как</td>
		<td>{Math.round(weatherData.main.feels_like)} °С</td>
		</tr>
    <tr>
		<td>Мин. темп.</td>
		<td>{Math.round(weatherData.main.temp_min)} °С</td>
		</tr>
    <tr>
		<td>Макс. темп.</td>
		<td>{Math.round(weatherData.main.temp_max)} °С</td>
		</tr>
    <tr>
		<td>Давление</td>
		<td>{weatherData.main.pressure} гПа</td>
		</tr>
    <tr>
		<td>Влажность</td>
		<td>{weatherData.main.humidity}%</td>
		</tr>
    <tr>
		<td>Скорость ветра</td>
		<td>{weatherData.wind.speed} м/с</td>
		</tr>
    <tr>
    <td>Направление ветра</td>
		<td>{weatherData.wind.deg}°</td>
		</tr>
    <tr>
    <td>Видимость</td>
		<td>{weatherData.visibility} м</td>
		</tr>
    <tr>
    <td>Рассвет</td>
		<td>{unixToDate(weatherData.sys.sunrise)}</td>
		</tr>
    <tr>
    <td>Закат</td>
		<td>{unixToDate(weatherData.sys.sunset)}</td>
		</tr>
    <tr>
    <td>Обновлено</td>
    <td>{updateTime}</td>
    </tr>
	  </tbody>
    </table>
    </div>
  );
}
