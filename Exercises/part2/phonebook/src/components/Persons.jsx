export const Persons = ({ persons }) => {
  return (
    <div id="numbers">
      {
        persons.map((person) =>
          <p key={person.id}>{person.name} {person.number}</p>)
      }
    </div>
  )
}