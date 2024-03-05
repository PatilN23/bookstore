import React from 'react';

function SearchBar({ query, onInputChange, onFilterChange }) {
  const handleFilterChange = (event) => {
    const value = event.target.value;
    onFilterChange(value);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <input
        type="text"
        className="border border-gray-400 p-2 rounded w-3/4 mr-4"
        placeholder="Search for books..."
        value={query}
        onChange={onInputChange}
      />
      <select
        className="border border-gray-400 p-2 rounded w-1/4"
        onChange={handleFilterChange}
      >
        <option value="">All Categories</option>
        <option value="fiction">Fiction</option>
        <option value="nonfiction">Non-Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="scifi">Science Fiction</option>
      </select>
    </div>
  );
}

export default SearchBar;
