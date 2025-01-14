/* eslint-disable react/prop-types */

const Persons = ({ persons, filter, delPerson }) => {
    return (
        <div>
            {persons.filter(person => (
                person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter)
            )).map(person => (
                    <div key={person.id}>
                        <p>{person.name} {person.number}</p>
                        <button onClick={() => delPerson(person.id)}>delete</button>
                    </div>
                    
            ))}
        </div>
    )
}

export default Persons
