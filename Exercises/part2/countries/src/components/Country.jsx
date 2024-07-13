import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      lat: country.capitalInfo.latlng[0],
      lon: country.capitalInfo.latlng[1],
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      units: "metric",
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params })
      .then(response => {
        const apiResponse = response.data;
        setWeather([apiResponse])
      }).catch(error => {
        console.log(error);
      })
  }, [])

  if (weather.length > 0) {
    const currentWeather = weather[0]

    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {currentWeather.main.temp} Celcius</p>
        <p>wind {currentWeather.wind.speed} m/s</p>
      </div >
    )
  }
}

export const Country = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map((code) => (
          <li key={code}>{country.languages[code]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`}></img>
      <Weather country={country} />
    </div >
  )
}

export default Country