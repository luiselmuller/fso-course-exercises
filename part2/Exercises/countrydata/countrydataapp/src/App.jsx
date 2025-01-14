import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if(country) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => {
        const filteredCountries = res.data.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))
        setCountries(filteredCountries)
      })
      .catch(err => console.log(err))
    }
    else {
      setCountries([])
    }
  }, [country])


  const onCountryChange = (e) => {
    console.log(e.target.value)
    setCountry(e.target.value)
  }

  return (
    <div>
      <p>find countries</p>
      <input type="text" onChange={onCountryChange} placeholder="search" />
      <ul>
        {countries.length > 10 ? 
          <p>There are {countries.length} countries matching {country}, specify another filter</p> :
          countries.length === 1 ? countries.map(country => {
            return (
              <div key={country.name.common}>
                <p>{country.name.common}</p>
                <p>area: {country.area}</p>

                <p>Languages: </p>
                <ul>
                  {
                    Object.entries(country.languages).map(([key, value]) => 
                      <li key={key}>{value}</li>
                    )
                  }
                </ul>
                <img src={country.flags.png} alt={country.name.common} />
              </div>
            )
          }) : 
          countries.map(country => 
            <div key={country.name.common}>
              <p>{country.name.common}</p>
            </div>
          )}
      </ul>
      
    </div>
  )
}

export default App
