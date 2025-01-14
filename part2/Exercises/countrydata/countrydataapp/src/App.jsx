import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => {
        const filteredCountries = res.data.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))
        setCountries(filteredCountries)
      })
      .catch(err => console.log(err))
  }, [country])


  const onCountryChange = (e) => {
    setCountry(e.target.value)
  }

  return (
    <div>
      <p>find countries</p>
      <input type="text" onChange={onCountryChange} placeholder="search" />
      <ul>
        {countries.length > 10 ? <p>Too many matches, specify another filter</p> : countries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
      
    </div>
  )
}

export default App
