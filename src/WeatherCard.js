import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './index.css';

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: 345,
    marginRight: 50,
    marginBottom: 50,
    borderRadius: 25,
    padding: 10
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function WeatherCard({city, remove}) {
  const [cityName, setCityName] = useState(city);
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
  const [updateTime, setUpdateTime] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loadind, setLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    // async function fetchWeather() {
    //   const city = cityName;
    //   const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
    //   city + "&lang=ru&units=metric&appid=5fc73283d7afc0b780eee68e8e3bb82b";
    //   const responce = await fetch(url);
    //   const data = await responce.json();
    //   setWeatherData(data);
    //   setUpdateTime(new Date().toLocaleTimeString());
    //   setLoading(false);
    // }
    fetchWeather();
  }, []);

  async function fetchWeather() {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName + "&lang=ru&units=metric&appid=5fc73283d7afc0b780eee68e8e3bb82b";
    const responce = await fetch(url);
    const data = await responce.json();
    setWeatherData(data);
    setUpdateTime(new Date().toLocaleTimeString());
    setLoading(false);
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    remove(city);
  };
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  if (loadind)
    return <div className="loader"></div>;

  return(
    <Card className={classes.root}>
    <CardContent>
      <Typography variant="h5">
        {weatherData.name}
      </Typography>
      <div className="crutch">
        <Typography variant="h2">
          {Math.round(weatherData.main.temp)} °С
        </Typography>
        <img
          className="image"
          // src={"http://openweathermap.org/img/w/" +
          //   weatherData.weather[0].icon + ".png"}
          // src={require("./" + weatherData.weather[0].icon + ".png")}
          src={process.env.PUBLIC_URL + '/'+ weatherData.weather[0].icon + '.png'}
          alt={weatherData.weather.main}
        />
      </div>
      <Typography>
        {weatherData.weather[0].description.charAt(0).toUpperCase()
          + weatherData.weather[0].description.substring(1)}
      </Typography>
      <Typography color="textSecondary">
        Время последнего обновления: {updateTime}
      </Typography>
    </CardContent>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
      <Typography>
        Мин. t: {Math.round(weatherData.main.temp_min)} °С
      </Typography>
      <Typography>
        Макс. t: {Math.round(weatherData.main.temp_max)} °С
      </Typography>
      <Typography>
        Ощущается как: {Math.round(weatherData.main.feels_like)} °С
      </Typography>
      <Typography>
        Скорость ветра: {Math.round(weatherData.wind.speed)} м/с
      </Typography>
      </CardContent>
    </Collapse>
      <CardActions>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpand}
        aria-expanded={expanded}
        aria-label="Развернуть"
      >
        <ExpandMoreIcon />
      </IconButton>
        <IconButton onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          <MenuItem onClick={() => {
            setExpanded(false);
            setLoading(true);
            fetchWeather();
            setAnchorEl(null);
          }}>Обновить
          </MenuItem>
          <Link
            to={{pathname: "/weather-details", city: weatherData.name}}
            style={{textDecoration: 'none', color: 'inherit'}}
          >
            <MenuItem onClick={handleClose}>
              Показать подробную информацию
            </MenuItem>
          </Link>
          <MenuItem onClick={handleDelete}>
          <span style={{  color: "#f44336"  }}>Удалить</span>
          </MenuItem>
        </Menu>
      </CardActions>

    </Card>
  );
}
