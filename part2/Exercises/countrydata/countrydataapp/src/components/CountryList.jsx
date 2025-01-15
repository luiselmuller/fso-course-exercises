import Country from './Country'

const CountryList = ({ countries }) => {

    
    return(
        countries.map(country => {
            return (
                <div key={country.name.common}>
                    <Country country={country} />
                </div>
            )
      }
    )

    )
}

export default CountryList
