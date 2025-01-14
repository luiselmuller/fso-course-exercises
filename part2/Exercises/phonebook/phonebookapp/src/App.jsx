import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
         .then(response => setPersons(response.data))
         .catch(error => console.log(error))
  }, [])

  useEffect(() => {


  }, [newName, newNumber, persons])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName || person.number === newNumber)) {
      alert(`${newName} or ${newNumber} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
        axios.post('http://localhost:3001/persons', {name: newName, number: newNumber,  id: persons.length + 1 })
        .then(response => setPersons(persons.concat(response.data)))
        .catch(error => console.log(error))
        setNewName('')
        setNewNumber('')
    }

  }

  const onFilterChange = (event) => {
    setFilter(event.target.value)
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