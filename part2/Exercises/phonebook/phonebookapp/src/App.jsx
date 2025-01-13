import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName || person.number === newNumber)) {
        alert(`${newName} or ${newNumber} is already in the phonebook`)
        setNewName('')
        setNewNumber('')
    }
    else {
        setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
        setNewName('')
        setNewNumber('')
    }
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        onFilterChange={onFilterChange}
      />

      <h3>Add a new person</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        onNameChange={onNameChange} 
        onNumberChange={onNumberChange} 
        addPerson={addPerson}
      />
      
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filter={filter}
      />

    </div>
  )
}

export default App