import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import "./style/search.css"

import { KEY, URL } from "./Api.js";

const Search = () => {
  // const [select, setSelect] = useState(0);
  // const [selectValue, setSelectValue] = useState("");
  const history = useHistory();
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)
  const [searchRes, setSearchRes] = useState({})
  const [searchLoad, setSearchLoad] = useState(false);
  const [noData,setNoData] = useState('')


// convert user's input of city and state into geo coordinates and fetch weather info based on coordinates
  const converGeo = (city, state) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=1&appid=${KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if(!data.length){
          setNoData('Location not found!Please try another one!')
          return
        }else{
          const lat = data[0].lat
          const lng = data[0].lon
          setSearchRes({});
          fetch(
            `${URL}&lat=${lat}&lon=${lng}&units=metric&cnt=40&exclude=hourly,minutely&appid=${KEY}`
          ).then((res) => res.json())
            .then((data) => {

              setSearchRes(data);
              setSearchLoad(true)
          })

  }
});

  }


  const handlesubmit = (e) => {
    e.preventDefault()
    converGeo(city, state)
  }


// update history state based on input and redirect user to weatherlist page
  useEffect(() => {
    if (searchLoad && Object.keys(searchRes).length) {
      history.push({
        pathname: `/weatherlist`,
        state: { searchRes }
      });
      window.location.reload();
    }
  }, [searchLoad, history, searchRes]);
  
  return (
    <div className="search-container">
      <form onSubmit={handlesubmit}>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="City"
              onChange={(e) =>{
                setNoData('')
                setCity(e.target.value.toLowerCase())}}
              required
              autoComplete='false'
            ></input>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="state"
              id="state"
              placeholder="State"
              onChange={(e) =>{
                setState(e.target.value.toLocaleLowerCase())
                setNoData('')
              }}
              required={true}

            ></input>
          </div>
          <div className="col-md-3 mt-md-0 text-md-left" style={{fontWeight:'bold'}}>
            <button className="btn btn-warning" style={{fontWeight:'600'}}>Get Weather</button>
          </div>
        </div>
      {noData !== '' &&
        <p style={{textAlign:'center',color:'#ac3f21',marginBottom:'0'}}>{noData}</p>
      }
      </form>
    </div>
  );
};

export default Search;
