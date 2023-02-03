import moment from "moment";
import React, { useEffect, useState } from "react";
import "./style/summarycard.css";
import { KEY, ICON } from "./Api.js";
import "./style/current.css";
import Search from "./Search";



const CurrentCard = () => {
  const defaultIcon = `http://openweathermap.org/img/wn/02d@2x.png`;
  const [curWeatherIcon, setCurWeatherIcon] = useState(defaultIcon);
  const [time, setTime] = useState(moment().format("LT"));
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [feelLike, setFeelLike] = useState(null);
  const [description, setDescription] = useState(null);
  const [sunrise, setSunsire] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [load, setLoad] = useState(false);
  const [img, setImg] = useState(null);

  const [curLoc, setCurLoc] = useState(null);
  const [timeZone, setTimeZone] = useState(null);
  const [country, setCountry] = useState(null);
  const [title, setTitle] = useState();



// update clock time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const cur = new Date();
      moment.locale();
      setTime(moment(cur).format("LT"));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

// get current location and fetch local weather info
  const getCurLocation = () => {
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          showWeather(data);
          setLoad(true);
        })

    });
  };

  // get daily astronomy image from NASA
  const image = () => {
    fetch("https://go-apod.herokuapp.com/apod")
      .then((res) => res.json())
      .then((data) => {
        setImg(data.url)
        setTitle(data.title)

      })
  }

  image()


// display local weather info
  const showWeather = (data) => {
    let { humidity, pressure, feels_like } = data.main;
    let { description, icon } = data.weather[0];
    let { sunrise, sunset, country } = data.sys;

    setTimeZone(country)
    setHumidity(humidity);
    setPressure(pressure);
    setFeelLike(parseInt(feels_like));
    setDescription(description);
    setSunsire(moment(sunrise * 1000).format("HH:mm a"));
    setSunset(moment(sunset * 1000).format("HH:mm a"));
    setCurWeatherIcon(`${ICON + icon}@2x.png`);
    setCurLoc(data.name);
    setCountry(data.coord.lat + 'N' + data.coord.lon + 'E');

  };


  getCurLocation();


  return (
    <div className="cur-container">
      <div className="current-info">
        <div className="current-date-contianer">
          <div className="time" id="time">
            {time}
          </div>
          <div className="date" id="date">
            {moment(new Date()).format("dddd L")}
          </div>
          <div className="location">{curLoc}</div>
          <div className="others" id="current-weather-item">
            {load ? (
              <>
                <div className="icon">
                  <div className="weather-item">
                    <img src={curWeatherIcon} alt="" />
                    <div style={{ margin: "auto", fontSize: "30px", color: '#e7b3b3' }}>
                      {description}
                    </div>
                  </div>
                </div>
                <div className="weather-item">
                  <div>Humidity</div>
                  <div>{humidity}%</div>
                </div>
                <div className="weather-item">
                  <div>Pressure</div>
                  <div>{pressure} hPa</div>
                </div>
                <div className="weather-item">
                  <div>FeelLike</div>
                  <div>{feelLike}&deg;C</div>
                </div>

                <div className="weather-item">
                  <div>Sunrise</div>
                  <div>{sunrise}</div>
                </div>
                <div className="weather-item">
                  <div>Sunset</div>
                  <div>{sunset}</div>
                </div>
              </>
            ) : (
              <>
                <h1>Loading Data</h1>
              </>
            )}
          </div>
        </div>
        <div className="place-container">
          <div className="place-top">
            <div className="time-zone">{timeZone}</div>
            <div id="country" className="country">
              {country}
            </div>

          </div>
          <div className="search-bar" style={{ marginTop: '1rem' }}>
            <Search />
          </div>
          <div className="img-container">
            <h2>Astronomy For Today</h2>
            {img ? <img src={img} alt='' style={{ width: '400px', height: '300px', objectFit: 'cover' }} /> : <p>Loading</p>}
            <h4 style={{ width: '400px', overflowWrap: 'break-word', color: '#6e3b3b' }}>{title}</h4>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CurrentCard;
