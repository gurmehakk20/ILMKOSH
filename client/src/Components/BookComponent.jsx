import React, { useState, useCallback } from 'react';

const BookComponent = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleReadClick = useCallback((book) => {
    setSelectedBook(book);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedBook(null);
  }, []);

  const handleOpenPreview = useCallback(() => {
    if (selectedBook?.volumeInfo?.previewLink) {
      window.open(selectedBook.volumeInfo.previewLink, '_blank');
    }
    setSelectedBook(null);
  }, [selectedBook]);

  return (
    <div className='Main'>
      <div className="books-list">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-item"
            onClick={() => handleReadClick(book)}
          >
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
            <div className="book-title">{book.volumeInfo.title}</div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2 className="popup-book-title">{selectedBook.volumeInfo.title}</h2>
            </div>
            <div className="popup-book-info">
              <img
                className="popup-book-cover"
                src={selectedBook.volumeInfo.imageLinks.thumbnail}
                alt={selectedBook.volumeInfo.title}
              />
              <div className="popup-book-author">
                By {selectedBook.volumeInfo.authors?.join(', ') || 'Unknown Author'}
              </div>
              <div className="popup-book-description">
                {selectedBook.volumeInfo.description || 'No description available.'}
              </div>
              <div className="popup-buttons">
                <button className="read-button" onClick={handleOpenPreview}>
                  Read Preview
                </button>
                <button className="close-button" onClick={handleClosePopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookComponent;