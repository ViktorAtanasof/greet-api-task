import '../Filter/Filter.css';

function Filter({ categories, selectedCategory, onCategoryChange }) {
  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    <div>
      <label className="filter-label" htmlFor="categoryFilter">
        Filter by Category:
      </label>
      <select
        className="filter-select"
        id="categoryFilter"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {decodeURIComponent(category)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
