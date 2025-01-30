export const Filter = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      filter shown with <input value={newSearch} onChange={handleSearchChange} />
    </div>
  )
}

export const PersonForm = ({ addContact, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export const Persons = ({ persons, search, deleteContactWithID }) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
        .map(person => (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deleteContactWithID(person.id)}>delete</button>
          </div>
        ))}
    </div>
  )
}