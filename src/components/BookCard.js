import React, { useState } from 'react';

function BookCard({ book, onBookmark }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    console.log('Before toggle:', isBookmarked);
    setIsBookmarked(!isBookmarked);
    console.log('After toggle:', !isBookmarked);
    onBookmark(book.id);
  };

  const handleMoreDescriptionClick = () => {
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {book.volumeInfo.imageLinks && (
        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="w-full h-64 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{book.volumeInfo.title}</h2>
        <p className="text-gray-600">{book.volumeInfo.authors?.join(', ')}</p>
        <div className="flex justify-between">
        <button
  className={`mt-2 text-white font-bold py-1 px-2 rounded ${isBookmarked ? 'bg-yellow-500' : 'bg-blue-500'}`}
  onClick={handleBookmarkClick}
>
  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
</button>


          <div className="w-5"></div>
          
          <button onClick={handleMoreDescriptionClick}>More Description</button>

        </div>
      </div>
    </div>
  );
}

export default BookCard;