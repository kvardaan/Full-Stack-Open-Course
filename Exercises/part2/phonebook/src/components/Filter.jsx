export const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div id="filter">
      filter shown with
      <input
        value={newFilter}
        onChange={handleFilterChange}
      />
    </div>
  );
};