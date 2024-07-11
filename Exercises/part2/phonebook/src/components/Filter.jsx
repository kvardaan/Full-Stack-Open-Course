import { useState } from "react";

export const Filter = ({ persons, setFilteredPersons }) => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event) => {
    const text = event.target.value.toLowerCase();
    setFilterText(text);

    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(text)
    );
    setFilteredPersons(filteredPersons);
  };

  return (
    <div id="filter">
      <label htmlFor="filter">filter shown with </label>
      <input
        id="filter"
        type="text"
        value={filterText}
        onChange={handleFilterChange}
      />
    </div>
  );
};
