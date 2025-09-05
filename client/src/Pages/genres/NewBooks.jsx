import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Romance = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=mystery&maxResults=40`);
        const filteredBooks = response.data.items.filter(book => book.volumeInfo.imageLinks?.thumbnail);
        setBooks(filteredBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleReadClick = React.useCallback((book) => {
    setSelectedBook(book);
  }, []);

  const handleClosePopup = React.useCallback(() => {
    setSelectedBook(null);
  }, []);

  const handleOpenPreview = React.useCallback(() => {
    if (selectedBook?.volumeInfo?.previewLink) {
      window.open(selectedBook.volumeInfo.previewLink, '_blank');
    }
    setSelectedBook(null);
  }, [selectedBook]);

  const handleAddToCart = () => {
    navigate('/mybooks', { state: { book: selectedBook } });
  };

  const handleSaveBook = useCallback(async (book) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const payload = {
        googleId: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || [],
        thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
        previewLink: book.volumeInfo.previewLink || '',
        infoLink: book.volumeInfo.infoLink || '',
      };
      await axios.post(`${base}/user/saved`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  }, [navigate]);
  return (
    <div className='Main'>
      
      <h1 style={{ fontFamily: "Italianno, system-ui", color: "#D8C3A5", fontWeight: "550", fontSize: "50px", textAlign: "center" }}>
        New Books
      </h1>
      {loading ? (
        <div className="grid gap-5 mx-auto px-5 mb-[100px] grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-[10px] p-5 bg-[#F0E2C6] animate-pulse">
              <div className="w-full h-[150px] bg-black/10 rounded-[10px]" />
              <div className="mt-3 h-4 bg-black/10 rounded w-3/4" />
              <div className="mt-2 h-4 bg-black/10 rounded w-1/2" />
              <div className="mt-4 h-8 bg-black/10 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 mx-auto px-5 mb-[100px] grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="group bg-[#F0E2C6] rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 ease-out z-[1] flex flex-col items-stretch hover:-translate-y-0.5">
                <div className="relative w-full h-48 overflow-hidden rounded-lg bg-black/5">
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex-1">
                  <h3 className="text-[0.95rem] font-semibold text-[#3E2723] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {book.volumeInfo.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#5f5a54] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                  </p>
                </div>
                <button onClick={() => handleReadClick(book)} className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#3E2723] to-[#867A6B] text-white py-2 text-sm font-medium shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3E2723]/40">Read Preview</button>
                <button onClick={() => handleSaveBook(book)} className="mt-2 w-full rounded-lg bg-mocha/20 text-[#3E2723] py-2 text-sm font-medium hover:bg-mocha/30">Save to My Books</button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">No books available.</p>
          )}
        </div>
      )}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white rounded-[10px] p-5 w-[80%] max-w-[600px] max-h-[80%] overflow-y-auto relative">
            <h2 className="mt-0">{selectedBook.volumeInfo.title}</h2>
            <p className="text-[1.1em] mt-5">{selectedBook.volumeInfo.description || 'No description available.'}</p>
            <div className="flex gap-3 mt-3 flex-wrap">
              <button onClick={handleOpenPreview} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">Open Preview in New Tab</button>
              <button onClick={handleClosePopup} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">Close</button>
              <button onClick={handleAddToCart} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">View in My Books</button>
              <button onClick={() => handleSaveBook(selectedBook)} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Romance;
