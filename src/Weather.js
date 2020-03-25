import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import Search from './Search';
import Box from '@material-ui/core/Box';

export default function Weather() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    keys.map((key) =>
      setCities((cities) => [...cities, localStorage.getItem(key)])
    );
  }, []);

  const remove = (city) => {
    const index = cities.indexOf(city);
    if (index > -1) {
      cities.splice(index, 1);
    }
    setCities((cities) => [...cities]);
    localStorage.removeItem(JSON.stringify(city));
  };

  const add = (city) => {
    if (!cities.includes(city)) {
      setCities((cities) => [...cities, city]);
      localStorage.setItem(JSON.stringify(city), city);
    } else
      alert(city.charAt(0).toUpperCase() + city.substring(1) + ' уже в списке');
  };

  return (
    <Box display="flex" flexWrap="wrap">
      {cities.map((city) => (
        <div key={JSON.stringify(city)}>
          <WeatherCard city={city} remove={remove}></WeatherCard>
        </div>
      ))}
      <Search add={add} />
    </Box>
  );
}
