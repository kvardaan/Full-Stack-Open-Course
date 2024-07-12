import { useEffect, useState } from "react"

import { Filter } from "./components/Filter"
import { Persons } from "./components/Persons"
import phoneService from "./services/persons"
import { PersonForm } from "./components/PersonForm"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialRecords => {
        setPersons(initialRecords)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find((person) => person.name === newName)

    if (person) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const personObject = {
          ...person,
          number: newNumber,
        }

        phoneService.update(person.id, personObject).then(returnedRecord => {
          setPersons(prevPersons => prevPersons.map(person => (person.id === returnedRecord.id ? returnedRecord : person)));
          setNewName("")
          setNewNumber("")
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      phoneService.create(personObject).then(returnedRecord => {
        setPersons(prevPersons => prevPersons.concat(returnedRecord))
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete "${name}"?`)
    if (confirmDelete) {
      phoneService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value.toLowerCase())

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter)
  )

  return (
    <div>
      <h2>Phone Book</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
