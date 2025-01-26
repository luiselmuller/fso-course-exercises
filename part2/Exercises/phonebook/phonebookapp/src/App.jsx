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
  const [alertMessage, setAlertMessage] = useState({ alert: '', type: 'success'})

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

              displayNotification({alert: `Updated ${personToUpdate.name}'s number to ${newNumber}`, type: 'success'})
            }
          )
          .catch(error => console.log(error))
        
      }
      clearForm()
    }
    else {
        personsService.create({ name: newName, number: newNumber, id: (persons.length + 1).toString() })
          .then(person => {
              setPersons(persons.concat(person))

              displayNotification({alert: `Added ${person.name}`, type: 'success'})
          })
          .catch(error => displayNotification({alert: error.response.data.error, type: 'error'}))
        clearForm()
    }
  }

  // Delete person from phonebook
  const delPerson = (id) => {
    const person = persons.find(person => person.id === id)
    
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
        personsService.deletePerson(person.id)
        .then(() => {
            setPersons(persons.filter(person => person.id !== id))
            displayNotification({alert: `Deleted ${person.name}`, type: 'success'})
        })
        .catch(error => {
            displayNotification({alert: `Error deleting person: ${error.message} This person was already deleted, please refresh the page`, type: 'error'})
        })
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

  const displayNotification = (alertObject) => {
    setAlertMessage(alertObject)
    setTimeout(() => { setAlertMessage({alert: '', type: 'success'}) }, 5000)
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage.alert} type={alertMessage.type} />

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