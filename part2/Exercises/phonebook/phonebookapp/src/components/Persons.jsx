/* eslint-disable react/prop-types */

const Persons = ({ persons, filter }) => {

    return (
        <div>
            {persons.filter(person => (
                person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter)
            )).map(person => (
                <p key={person.id}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    )
}

export default Persons
