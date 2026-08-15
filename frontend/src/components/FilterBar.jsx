// FilterBar.jsx
// Lets the user filter the expense list by category, month, and search text.

const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Education",
  "Entertainment",
  "Other",
];

function FilterBar({
  categoryFilter,
  setCategoryFilter,
  monthFilter,
  setMonthFilter,
  searchText,
  setSearchText,
}) {
  const clearFilters = () => {
    setCategoryFilter("All");
    setMonthFilter("All");
    setSearchText("");
  };

  return (
    <section className="filter-bar">
      <div className="filter-item">
        <label>Category</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label>Month</label>
        <input
          type="month"
          value={monthFilter === "All" ? "" : monthFilter}
          onChange={(e) =>
            setMonthFilter(e.target.value === "" ? "All" : e.target.value)
          }
        />
      </div>

      <div className="filter-item">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search description..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <button className="btn-secondary" onClick={clearFilters}>
        Clear Filters
      </button>
    </section>
  );
}

export default FilterBar;
