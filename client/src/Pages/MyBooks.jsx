import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyCart = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSaved = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      const resp = await axios.get(`${import.meta.env.VITE_API_URL}/user/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(resp.data?.savedBooks || []);
    } catch (e) {
      setError('Failed to load saved books');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSaved();
  }, [fetchSaved]);

  const removeSaved = async (googleId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/saved/${googleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prev) => prev.filter((b) => b.googleId !== googleId));
    } catch {}
  };

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-center text-[50px] font-[550] text-[#D8C3A5]" style={{ fontFamily: 'Italianno, system-ui' }}>
        My Books
      </h1>

      {loading && (
        <div className="grid gap-5 mx-auto px-5 mb-[100px] max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[10px] p-5 bg-[#F0E2C6] animate-pulse">
              <div className="w-full h-56 bg-black/10 rounded-[10px]" />
              <div className="mt-3 h-4 bg-black/10 rounded w-3/4" />
              <div className="mt-2 h-4 bg-black/10 rounded w-1/2" />
              <div className="mt-4 h-8 bg-black/10 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && books.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <div key={b.googleId} className="bg-[#F0E2C6] rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div className="p-6 flex items-center justify-center bg-black/5">
                {b.thumbnail ? (
                  <img src={b.thumbnail} alt={b.title} className="w-40 h-56 object-cover rounded-lg shadow" />
                ) : (
                  <div className="w-40 h-56 bg-black/10 rounded-lg" />
                )}
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-lg font-bold text-[#3E2723] text-center whitespace-nowrap overflow-hidden text-ellipsis">{b.title}</h2>
                <p className="mt-1 text-xs text-[#5f5a54] text-center whitespace-nowrap overflow-hidden text-ellipsis">{(b.authors || []).join(', ') || 'Unknown Author'}</p>
              </div>
              <div className="p-6 pt-0 flex gap-3">
                {b.previewLink && (
                  <a href={b.previewLink} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#3E2723] to-[#867A6B] text-white text-sm font-medium shadow hover:opacity-95">
                    Read Preview
                  </a>
                )}
                {b.infoLink && (
                  <a href={b.infoLink} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2 rounded-lg bg-mocha/20 text-[#3E2723] text-sm font-medium hover:bg-mocha/30">
                    Details
                  </a>
                )}
                <button onClick={() => removeSaved(b.googleId)} className="px-4 py-2 rounded-lg bg-red-600/80 text-white text-sm hover:bg-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && (
        <div className="max-w-xl mx-auto mt-10 text-center bg-[#F0E2C6] rounded-2xl shadow p-8">
          <p className="text-[#3E2723]">Your library is empty. Add books from the catalog.</p>
          <Link to="/bookshelf" className="inline-block mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#3E2723] to-[#867A6B] text-white text-sm font-medium shadow hover:opacity-95">
            Explore Genres
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCart;
