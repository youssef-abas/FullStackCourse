import { useState } from 'react'

const Filter = ({newSearch, handleSearchChange}) => {
  return (
    <div>
      filter shown with <input value={newSearch} onChange={handleSearchChange}/>
    </div>
  )
}

const PersonForm = ({addContact, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({name, number}) => {
  return (
    <li>{name} {number}</li>
  )
}

const Persons = ({persons, search}) => {
  const searchedPersons = persons.filter((person) => (person.name.toLowerCase().includes(search.toLowerCase())))
  console.log(searchedPersons)
  return (
    <ul>
      {(searchedPersons.map((person) => <Person key={person.id} name={person.name} number={person.number} />))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added in the phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
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

      <Persons persons={persons} search={newSearch}/>    
    </div>
  )
}

export default App