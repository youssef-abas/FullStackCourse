import { useState, useEffect } from 'react'

import contactService from './services/contacts'

import { Filter, PersonForm, Persons } from './components/personComponents'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [operationSuccess, setOperationSuccess] = useState(true)

  useEffect(
    () => {
      contactService
        .addAllContacts()
        .then(contacts => {
          setPersons(contacts)
        })
    }
  , [])

  const addContact = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson !== undefined){
      if (window.confirm(`${newName} is already added in the phonebook, replace the old number with a new one?`)){
        const personToUpdate = {...existingPerson, number: newNumber}
        contactService
          .updateContactRemote(existingPerson.id, personToUpdate)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            setNewName('')
            setNewNumber('')

            setNotification(`Updated ${updatedPerson.name}'s number from ${existingPerson.number} to ${updatedPerson.number}`)
            setTimeout(() => {
            setNotification(null)
        }, 5000)
          })
          .catch(error =>{
            setOperationSuccess(false)
            setNotification(`Information of ${existingPerson.name} has already been removed from server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)

            const newPersons = persons.filter(person => existingPerson.id !== person.id)
            setPersons(newPersons)
          })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    contactService
      .addContactRemote(personObject)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')

        setOperationSuccess(true)
        setNotification(`Added ${addedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const deleteContactWithID = id => {
    contactService.deleteContactRemote(id)
      .then(response => {
        const deletedPerson = persons.find(person => person.id === id)
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)

        setOperationSuccess(true)
        setNotification(`Deleted ${deletedPerson.name}'s contact`)
            setTimeout(() => {
            setNotification(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} success={operationSuccess}/>

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>

      <h2>Add a new</h2>

      <PersonForm addContact={addContact} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>

      <Persons persons={persons} search={newSearch} deleteContactWithID={deleteContactWithID}/>    
    </div>
  )
}

export default App