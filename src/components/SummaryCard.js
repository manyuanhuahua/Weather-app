import moment from "moment";
import React from "react";
import "./style/summarycard.css";
import { ICON } from "./Api.js";

const SummaryCard = ({ item }) => {
  const icon = `${ICON + item.weather[0].icon}@2x.png`;

  return (
    <div className="summary-container">
      <div className="summary-content">
        <div className="top">
          <div className="location">
            <img src={icon} alt="" className="selected-icon" />
            <h4>{item.weather[0].main}</h4>
          </div>
          <p style={{ fontWeight: 'bold', color: '#fff' }}>{moment(item.dt_txt).format("MMM Do YY")}</p>
        </div>
        <div className="temp">
          <h2>{parseInt(item.main.temp)}&deg;C</h2>
        </div>
        <div className="bottom" style={{ width: "100%" }}>
          <p>{item.main.feels_like}&deg;C</p>
          <p>{item.main.humidity}%</p>
          <p>{item.wind.speed}MPH</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
