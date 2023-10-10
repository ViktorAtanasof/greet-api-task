function Sort({ selectedSortOption, onSortChange }) {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <section>
      <label htmlFor="sortOption">Sort by:</label>
      <select
        id="sortOption"
        onChange={handleSortChange}
        value={selectedSortOption}
      >
        <option value="">Select option</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </section>
  );
}

export default Sort;
