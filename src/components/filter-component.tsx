import React from 'react'

function FilterComponent({ filters, onFilterChange }) {
  const handleSearchChange = (event) => {
    onFilterChange({ ...filters, search: event.target.value })
  }

  const handleCategoryChange = (event) => {
    onFilterChange({ ...filters, category: event.target.value })
  }

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search products..."
        value={filters.search}
        onChange={handleSearchChange}
      />
      <select value={filters.category} onChange={handleCategoryChange}>
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        {/* ... other categories */}
      </select>
    </div>
  )
}

export default FilterComponent
