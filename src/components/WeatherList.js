import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import SummaryCard from "./SummaryCard";

import './style/weatherList.css'
import LineChart from "./LineChart";




const WeatherList = () => {
  const location = useLocation()
  const history = useHistory()
  const weather = location.state.searchRes
  const weekly = weather.list.filter((item, i) => i % 8 === 4)

  if (!location || !location.state) {
    return <p>Loading...</p>;
  }
  
  const handleClick = (index) => {
    const daily = weather.list.filter((item, i) => (i >= (index * 8) && (i < (index + 1) * 8)))

    history.push({
      pathname: `/detail/${index}`,
      state: { daily: daily, city: weather.city },
    });
    window.location.reload();
  }
  return (
    <div className="weather-list-container">
      <h1 className="title">Next 5 days weather forcasting for <span style={{ color: '#ac3f21' }}>{weather.city.name}</span></h1>
      <div className="weather-section">
        <ul className="weather-list">
          {weekly && weekly.map((item, index) => {
            return (
              <li key={index} onClick={() => handleClick(index)}>
                <SummaryCard item={item} />
              </li>
            )
          })
          }
        </ul>
      </div>
      <div className="line-chart">
        <LineChart  weekly={weekly}/>
      </div>
    </div>
  );
};

export default WeatherList;
