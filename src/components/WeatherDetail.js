import React from "react";
import moment from 'moment'
import { useLocation } from "react-router-dom";
import { ICON } from "./Api.js";
import "./style/detail.css"
const WeatherDetail = () => {
    const location = useLocation()
    const data = location.state.daily
    const city = location.state.city.name

    return (
        <div className="detail-container">
            <div className="daily-detail">
                <h1>{moment(data[2].dt_txt).format("MMM Do YY")} {city} Weather Detail</h1>
            </div>
            <div className="top-container">

                <div className="clouds">
                    <div className="clounds-icon">
                        <img src={`${ICON + data[2].weather[0].icon}@4x.png`} alt='' style={{ width: '80%', height: '80%' }} />
                    </div>
                    <p className="cel">{parseInt(data[2].main.temp)}&deg;C</p>
                    <div className="daily-desription">{data[2].weather[0].description}</div>

                </div>

                <div className="more-info">

                    <h3>Feels like {parseInt(data[2].main.feels_like)}&deg;C</h3>
                    <div className="inner-container">
                        <div>
                            <p>Wind: {data[2].wind.speed}m/s</p>
                            <p>Pressure: {data[2].main.pressure}hPa</p>
                            <p>Humidity: {data[2].main.humidity}%</p>
                        </div>
                        <div>
                            <p>Visibility: {(data[2].visibility / 1000).toFixed(1)}km</p>
                            <p>Min Temp: {parseInt(data[2].main.temp_min)}&deg;C</p>
                            <p>Max Temp: {parseInt(data[2].main.temp_max)}&deg;C</p>
                        </div>

                    </div>
                </div>
            </div>
            <h1>Hourly Forecasting</h1>
            <div className="bottom-container">
                {data.map((hour, index) => {
                    return (
                        <div className="hour-summary" key={index}>
                            <div className="hour-grid">
                                <p>{parseInt(hour.main.temp)}&deg;C</p>
                                <p>
                                    {hour.weather[0].main}
                                    <img src={`${ICON + hour.weather[0].icon}@2x.png`} alt='' />
                                    {hour.weather[0].description}
                                </p>
                                <p>{moment(hour.dt_txt).format('hh:mm a')}</p>
                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default WeatherDetail
