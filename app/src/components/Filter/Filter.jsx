function Filter({ categories, selectedCategory, onCategoryChange }) {
    const handleCategoryChange = (e) => {
      onCategoryChange(e.target.value);
    };
  
    return (
      <section>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
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
      </section>
    );
  }

export default Filter;
