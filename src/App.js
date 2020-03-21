import React from 'react';
import './index.css';
import WeatherDetails from './WeatherDetails';
import Weather from './Weather';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Route exact path="/" component = {Weather}></Route>
      <Route path="/WeatherDetails" component = {WeatherDetails}></Route>
    </Router>
  );
}
