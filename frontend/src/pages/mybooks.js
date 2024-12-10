import React from 'react';
import { useLocation } from 'react-router-dom';

const MyCart = () => {
  const location = useLocation();
  const book = location.state?.book;

  return (
    <div>
      <h1>My Cart</h1>
      {book ? (
        <div>
          <h2>{book.volumeInfo.title}</h2>
          <p>Author(s): {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            style={{ maxWidth: '200px', borderRadius: '10px' }}
          />
          <p>{book.volumeInfo.description || 'No description available.'}</p>
        </div>
      ) : (
        <p>Your cart is empty. Please add books from the catalog.</p>
      )}
    </div>
  );
};

export default MyCart;
