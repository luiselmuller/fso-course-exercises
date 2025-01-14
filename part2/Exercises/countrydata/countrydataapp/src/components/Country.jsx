/* eslint-disable react/prop-types */
import { useState } from 'react'

const Country = ({ country: { name, area, languages, flags } }) => {
    const [toggle, setToggle] = useState(false)

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
