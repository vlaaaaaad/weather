import React, { useState, useEffect, useCallback, useReducer } from 'react';
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
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    marginRight: 50,
    marginBottom: 50,
    borderRadius: 25,
    padding: 10,
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

export default function WeatherCard({ city, remove }) {
  const [cityName, setCityName] = useState(city);
  const [weatherData, setWeatherData] = useState(null);
  const [updateTime, setUpdateTime] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { weatherData, updateTime, loading } = state;

  const classes = useStyles();

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case 'start':
  //       return {
  //         loading: true,
  //       };
  //     case 'add':
  //       return {};
  //   }
  // }

  useEffect(() => {
    // async function fetchWeather() {
    //   const city = cityName;
    //   const url =
    //     'https://api.openweathermap.org/data/2.5/weather?q=' +
    //     city +
    //     '&lang=ru&units=metric&appid=5fc73283d7afc0b780eee68e8e3bb82b';
    //   const responce = await fetch(url);
    //   const data = await responce.json();
    //   setWeatherData(data);
    //   setUpdateTime(new Date().toLocaleTimeString());
    //   setLoading(false);
    // }
    fetchWeather();
  }, []);

  const fetchWeather = useCallback(() => {
    const url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      cityName +
      '&lang=ru&units=metric&appid=5fc73283d7afc0b780eee68e8e3bb82b';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      });
    setUpdateTime(new Date().toLocaleTimeString());
  }, [setWeatherData, setUpdateTime, setLoading]);

  const handleClick = (event) => {
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

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.substring(1);
  };

  if (loading) return <div className="loader"></div>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">{weatherData.name}</Typography>
        <div className="crutch">
          <Typography variant="h2">
            {Math.round(weatherData.main.temp)} °С
          </Typography>
          <img
            className="image"
            // src={"http://openweathermap.org/img/w/" +
            //   weatherData.weather[0].icon + ".png"}
            // src={require("./" + weatherData.weather[0].icon + ".png")}
            src={
              process.env.PUBLIC_URL +
              '/' +
              weatherData.weather[0].icon +
              '.png'
            }
            alt={weatherData.weather.main}
          />
        </div>
        <Typography>
          {capitalize(weatherData.weather[0].description)}
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
          <MenuItem
            onClick={() => {
              setExpanded(false);
              setLoading(true);
              fetchWeather();
              setAnchorEl(null);
            }}
          >
            Обновить
          </MenuItem>
          <Link
            to={{
              pathname: '/weather-details',
              city: weatherData.name,
              capitalize: capitalize,
            }}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MenuItem onClick={handleClose}>
              Показать подробную информацию
            </MenuItem>
          </Link>
          <MenuItem onClick={handleDelete}>
            <span style={{ color: '#f44336' }}>Удалить</span>
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}
