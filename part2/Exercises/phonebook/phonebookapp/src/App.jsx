import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

  // Display all people in the phonebook
  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons))
      .catch(error => console.log(error))
  }, [])

  // Add person to phonebook
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook, do you want to replace this persons number?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        personsService.update(personToUpdate.id, { ...personToUpdate, number: newNumber })
          .then(
            updatedPerson => {
              setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
              setAlertMessage(`Updated ${personToUpdate.name}'s number to ${newNumber}`)
              setTimeout(() => { setAlertMessage(null) }, 5000)
            }
          )
          .catch(error => console.log(error))
        
      }
      setNewName('')
      setNewNumber('')
    }
    else {
        personsService.create({ name: newName, number: newNumber, id: (persons.length + 1).toString() })
          .then(person => {
              setPersons(persons.concat(person))
              setAlertMessage(`Added ${person.name}`)
              setTimeout(() => { setAlertMessage(null) }, 5000)
          })
          .catch(error => console.log(error))
        setNewName('')
        setNewNumber('')
    }
  }

  // Delete person from phonebook
  const delPerson = (id) => {
    const person = persons.find(person => person.id === id)
    // console.log(person)
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      setAlertMessage(`Deleted ${person.name}`)
      // console.log(person.name, person.id)
      personsService.deletePerson(person.id)
      .then(() =>{
        setPersons(persons.filter(person => person.id !== id))
        setAlertMessage(`Deleted ${person.name}`)
        setTimeout(() => { setAlertMessage(null) }, 5000)
      })
      .catch(error => console.log(error))
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

  // Clear alert message after a few seconds 
  useEffect(() => {
    setTimeout(() => setAlertMessage(''), 4000)
  }, [alertMessage])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} />

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
        delPerson={delPerson}
        persons={persons} 
        filter={filter}
      />

    </div>
  )
}

export default App