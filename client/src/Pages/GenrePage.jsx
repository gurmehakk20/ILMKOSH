import React, { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const GENRE_TO_QUERY = {
  fiction: 'fiction',
  mystery: 'mystery',
  'sci-fi': 'science fiction',
  scifi: 'science fiction',
  romance: 'romance',
  biography: 'biography',
  history: 'history',
  philosophy: 'philosophy',
  poetry: 'poetry',
};

export default function GenrePage() {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = useMemo(() => {
    const key = (genre || '').toLowerCase();
    return GENRE_TO_QUERY[key] || key || 'books';
  }, [genre]);

  useEffect(() => {
    let isCancelled = false;
    async function fetchBooks() {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=39`
        );
        const items = response.data?.items || [];
        const filtered = items.filter((b) => b?.volumeInfo?.imageLinks?.thumbnail);
        if (!isCancelled) setBooks(filtered);
      } catch (e) {
        if (!isCancelled) setError('Failed to load books.');
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    fetchBooks();
    return () => { isCancelled = true; };
  }, [query]);

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

  const handleAddToCart = useCallback(() => {
    if (!selectedBook) return;
    navigate('/mybooks', { state: { book: selectedBook } });
  }, [navigate, selectedBook]);

  const title = useMemo(() => {
    const name = (genre || '').replace('-', ' ');
    return `${name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Genre'} Books`;
  }, [genre]);

  return (
    <div className="Main">
      <h1 className="text-center text-[50px] font-[550] text-[#D8C3A5]" style={{ fontFamily: 'Italianno, system-ui' }}>
        {title}
      </h1>

      {loading && <p className="text-center">Loading…</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="books-list grid gap-5 mx-auto px-5 mb-[100px] grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="book-item bg-[#F0E2C6] rounded-[10px] p-5 text-center transition-transform duration-300 ease-in-out z-[1] grid grid-rows-[auto_1fr_auto] justify-items-center hover:scale-110">
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  className="w-auto h-[150px] object-cover rounded-[10px]"
                />
                <h3 className="booktitle whitespace-nowrap overflow-hidden text-ellipsis w-[200px] text-base mt-2">
                  {book.volumeInfo.title}
                </h3>
                <p className="booktitle whitespace-nowrap overflow-hidden text-ellipsis w-[200px] text-sm text-[#666]">
                  {book.volumeInfo.authors?.join(', ')}
                </p>
                <button onClick={() => handleReadClick(book)} className="rounded-[10px] border-2 border-[#D8C3A5] bg-[#D8C3A5] py-1 px-2">Read</button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">No books available.</p>
          )}
        </div>
      )}

      {selectedBook && (
        <div className="popup-container fixed inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="popup-content bg-white rounded-[10px] p-5 w-[80%] max-w-[600px] max-h-[80%] overflow-y-auto relative">
            <h2 className="mt-0">{selectedBook.volumeInfo.title}</h2>
            <p className="text-[1.1em] mt-5">{selectedBook.volumeInfo.description || 'No description available.'}</p>
            <div className="flex gap-3 mt-3 flex-wrap">
              <button onClick={handleOpenPreview} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">Open Preview in New Tab</button>
              <button onClick={handleClosePopup} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">Close</button>
              <button onClick={handleAddToCart} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">Add to Your Books</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


