const Person = ({ person, deletePerson }) => <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)} >delete</button></p >

export const Persons = ({ persons, deletePerson }) => {
  return (
    <div id="numbers">
      {persons.map((person) =>
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      )}
    </div >
  )
}