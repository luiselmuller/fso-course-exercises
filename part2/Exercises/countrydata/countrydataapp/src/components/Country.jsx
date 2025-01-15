/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import countryService from '../services/countries'

const Country = ({ country: { name, area, languages, flags } }) => {
    const [toggle, setToggle] = useState(false)
    const [weather, setWeather] = useState(null)

    useEffect(() => {     
        countryService.getWeather(name.common)
        .then(data => setWeather(data.current))
        .catch(err => console.log(err))
      }, [toggle, name.common])
      
    return (
        <div>
            {toggle && (
                <div>
                    <h2>{name.common}</h2>
                    <p>area: {area}</p>

                    <p>Languages: </p>
                    <ul>
                        {
                            Object.entries(languages).map(([key, value]) => 
                                <li key={key}>{value}</li>
                            )
                        }
                    </ul>
                    <img src={flags.png} alt={name.common} />

                    {weather && (
                        <div>
                            <p>Weather in {name.common}</p>
                            <p>Temperature: {weather.temperature}°C</p>
                            <p>Wind Speed: {weather.wind_speed} m/s</p>
                            <img src={weather.weather_icons[0]} alt="weather icon" />
                        </div>
                    )}
                </div>
            )}
            
            {!toggle && <h2>{name.common}</h2>}

            <button onClick={() => setToggle(!toggle)}>
                {toggle ? 'Hide' : 'Show'} info
            </button>
            
        </div>
    )
}


export default Country
