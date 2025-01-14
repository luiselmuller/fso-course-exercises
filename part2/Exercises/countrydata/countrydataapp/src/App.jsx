import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryList from './components/CountryList'
import Country from './components/Country'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if(country) {
      countryService.getAll()
        .then(countries => {
            setCountries(countries.filter(c => 
              c.name.common.toLowerCase().includes(country.toLowerCase())
            ))
      })
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

      <div>
        {
          countries.length > 10 ? <p>{countries.length} matches, specify another filter</p> :
          countries.length === 1 ? <Country country={countries[0]} /> :
          <CountryList countries={countries} />
        }
      </div>
    </div>
  )
}

export default App
