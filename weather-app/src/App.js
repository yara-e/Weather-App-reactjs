
import React, { useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { BiHappy } from 'react-icons/bi'
import { BsWind } from 'react-icons/bs'
import { MdCompress } from 'react-icons/md'
import { IoIosWater } from 'react-icons/io'
import axios from 'axios'
function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [hasError, setHasError] = useState(false);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=47e1294f9b8e1ec06136d1a7c856cf27`

  const search = (event) => {
    if (event.key == 'Enter') {
      axios(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      }).catch((e) => {
        setHasError(true);
        setLocation('')
      })
      setLocation('')
    }
  }
  return (
    <div className="container">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyUp={search}
          placeholder='Enter city or country '
          type="text" />
      </div>

      {hasError & !data.main ? <h3>no city or country by this name</h3> : null}

      <div className="details">
        <div className="place">


          {data.main ? <h1>{data.name},{data.sys.country}</h1> : null}
          {data.main ? <p>{data.weather[0].description}</p> : null}

          {data.main ? <img className='img' src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} /> : null}



          {data.main ? <h1>{(data.main.temp - 273.15).toFixed()}°c</h1> : null}


        </div>

      </div>
      {data.main ?
        <div className="card">

          <div className="des">
            <FaArrowDown />
            &nbsp; <small>min</small>
            <h3> {data.main ? <h3>{(data.main.temp_min - 273.15).toFixed()}°c</h3> : null}</h3>
          </div>

          <div className='des'>
            <FaArrowUp />
            &nbsp;  <small>max</small>
            <h3> {data.main ? <h3>{(data.main.temp_max - 273.15).toFixed()}°c</h3> : null}</h3>
          </div>

          <div className='des'>
            <BiHappy />
            &nbsp;<small>feels like</small>
            <h3> {data.main ? <h3>{(data.main.feels_like - 273.15).toFixed()}°c</h3> : null}</h3>
          </div>


        </div>
        : null}
      {data.main ?
        <div className="card">

          <div className="des">
            <BsWind />
            &nbsp;<small>wind speed</small>
            <h3> {data.main ? <h3>{data.wind.speed.toFixed()}</h3> : null}</h3>
          </div>

          <div className='des'>
            <MdCompress />
            &nbsp;<small>Pressure</small>
            <h3> {data.main ? <h3>{data.main.pressure}hPa</h3> : null}</h3>
          </div>

          <div className='des'>
            <IoIosWater />
            &nbsp;  <small>Humidity</small>
            <h3> {data.main ? <h3>{data.main.humidity}%</h3> : null}</h3>
          </div>
        </div>
        : null}
    </div>
  );
}

export default App;
