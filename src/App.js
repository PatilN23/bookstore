import React, { useState, useEffect } from 'react';
import BookCard from './components/BookCard';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (query.trim() === '') return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=10`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBooks((prevBooks) => [...prevBooks, ...data.items]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, startIndex]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = books.filter(book =>
        book.volumeInfo.categories && book.volumeInfo.categories.includes(selectedCategory)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [books, selectedCategory]);

  const handleInputChange = (event) => {
    setBooks([]);
    setStartIndex(0);
    setQuery(event.target.value);
  };

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
  };

  const handleBookmark = (bookId) => {
    const updatedBooks = filteredBooks.map(book =>
      book.id === bookId ? { ...book, bookmarked: !book.bookmarked } : book
    );
    setFilteredBooks(updatedBooks);
    // Save bookmarked books to local storage or backend
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setQuery('');
    setFilteredBooks(books);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Book Search</h1>
      <div className="flex flex-col sm:flex-row items-center mb-4">
        <input
          type="text"
          className="border border-gray-400 p-2 rounded mb-2 sm:mb-0 sm:mr-2"
          placeholder="Search for books..."
          value={query}
          onChange={handleInputChange}
        />
        <div className="flex items-center">
          <label className="mr-2">Filter by Category:</label>
          <select
            className="border border-gray-400 p-2 rounded mr-2"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">All</option>
            <option value="Fiction">Fiction</option>
            <option value="Nonfiction">Nonfiction</option>
            <option value="Science">Science</option>
            <option value="Fantasy">Fantasy</option>
            {/* Add more options as needed */}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
      {filteredBooks.length > 0 && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
