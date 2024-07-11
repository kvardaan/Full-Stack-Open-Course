import { useState } from "react"

import { Persons } from "./components/Persons"
import { PersonForm } from "./components/PersonForm"
import { Filter } from "./components/Filter"

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault()

    if (filteredPersons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
    setFilteredPersons(persons.concat(personObject));
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
