export function FilterControls({ currentFilter, onFilterChange }) {
  return (
    <div className="filters">
      <label>
        <input
          type="radio"
          name="filter"
          value="all"
          checked={currentFilter === 'all'}
          onChange={(e) => onFilterChange(e.target.value)}
        /> All
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          value="completed"
          checked={currentFilter === 'completed'}
          onChange={(e) => onFilterChange(e.target.value)}
        /> Completed
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          value="incomplete"
          checked={currentFilter === 'incomplete'}
          onChange={(e) => onFilterChange(e.target.value)}
        /> Incomplete
      </label>
    </div>
  );
}