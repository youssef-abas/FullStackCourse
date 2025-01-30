import { useState, useEffect } from 'react'

import contactService from './services/contacts'

import { Filter, PersonForm, Persons } from './components/personComponents'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
      })
  }

  const deleteContactWithID = id => {
    contactService.deleteContactRemote(id)
      .then(response => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
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