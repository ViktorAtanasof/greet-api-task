import "../Sort/Sort.css";

function Sort({ selectedSortOption, onSortChange }) {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div>
      <label className="sort-label" htmlFor="sortOption">
        Sort by:
      </label>
      <select
        className="sort-select"
        id="sortOption"
        onChange={handleSortChange}
        value={selectedSortOption}
      >
        <option value="">Select option</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
}

export default Sort;
