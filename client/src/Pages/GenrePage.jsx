import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
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
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const [totalAvailable, setTotalAvailable] = useState(Infinity);

  const PAGE_SIZE = 40; // Google Books max per request is 40

  const query = useMemo(() => {
    const key = (genre || '').toLowerCase();
    return GENRE_TO_QUERY[key] || key || 'books';
  }, [genre]);

  useEffect(() => {
    let isCancelled = false;
    async function fetchPage(startIndex, append) {
      if (append) setIsLoadingMore(true); else setLoading(true);
      setError('');
      try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${PAGE_SIZE}`;
        const response = await axios.get(url);
        const items = response.data?.items || [];
        const totalItems = Number(response.data?.totalItems || 0);
        const filtered = items.filter((b) => b?.volumeInfo?.imageLinks?.thumbnail);
        if (!isCancelled) {
          setTotalAvailable(totalItems || Infinity);
          setBooks((prev) => {
            const next = append ? [...prev, ...filtered] : filtered;
            const newCount = next.length;
            const more = startIndex + filtered.length < (totalItems || newCount);
            setHasMore(more && filtered.length > 0);
            return next;
          });
        }
      } catch (e) {
        if (!isCancelled) setError('Failed to load books.');
      } finally {
        if (!isCancelled) {
          if (append) setIsLoadingMore(false); else setLoading(false);
        }
      }
    }

    // Reset when query changes
    setBooks([]);
    setPageIndex(0);
    setHasMore(true);
    fetchPage(0, false);

    return () => { isCancelled = true; };
  }, [query]);

  // Load current pageIndex when it changes (after initial)
  useEffect(() => {
    if (pageIndex === 0) return; // already fetched
    const startIndex = pageIndex * PAGE_SIZE;
    let cancelled = false;
    (async () => {
      try {
        setIsLoadingMore(true);
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${PAGE_SIZE}`;
        const response = await axios.get(url);
        const items = response.data?.items || [];
        const totalItems = Number(response.data?.totalItems || 0);
        const filtered = items.filter((b) => b?.volumeInfo?.imageLinks?.thumbnail);
        if (!cancelled) {
          setTotalAvailable(totalItems || Infinity);
          setBooks((prev) => {
            const next = [...prev, ...filtered];
            const more = startIndex + filtered.length < (totalItems || next.length);
            setHasMore(more && filtered.length > 0);
            return next;
          });
        }
      } catch {
        if (!cancelled) setError('Failed to load more books.');
      } finally {
        if (!cancelled) setIsLoadingMore(false);
      }
    })();
    return () => { cancelled = true; };
  }, [pageIndex, query]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!observerRef.current) return;
    const el = observerRef.current;
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoadingMore && !loading) {
        setPageIndex((p) => p + 1);
      }
    }, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loading]);

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

  const [savedIds, setSavedIds] = useState(() => new Set());

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
      setSavedIds((prev) => new Set(prev).add(book.id));
    } catch {
      // noop for now
    }
  }, [navigate]);

  const title = useMemo(() => {
    const name = (genre || '').replace('-', ' ');
    return `${name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Genre'} Books`;
  }, [genre]);

  return (
    <div className="Main">
      <h1 className="text-center text-[50px] font-[550] text-[#D8C3A5]" style={{ fontFamily: 'Italianno, system-ui' }}>
        {title}
      </h1>

      {loading && (
        <div className="grid gap-5 mx-auto px-5 mb-[100px] grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="rounded-[10px] p-5 bg-[#F0E2C6] animate-pulse">
              <div className="w-full h-[150px] bg-black/10 rounded-[10px]" />
              <div className="mt-3 h-4 bg-black/10 rounded w-3/4" />
              <div className="mt-2 h-4 bg-black/10 rounded w-1/2" />
              <div className="mt-4 h-8 bg-black/10 rounded" />
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="books-list grid gap-5 mx-auto px-5 mb-[100px] grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className="group bg-[#F0E2C6] rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 ease-out z-[1] flex flex-col items-stretch hover:-translate-y-0.5"
              >
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
                <button
                  onClick={() => handleReadClick(book)}
                  className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#3E2723] to-[#867A6B] text-white py-2 text-sm font-medium shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3E2723]/40"
                >
                  Read Preview
                </button>
                <button
                  onClick={() => handleSaveBook(book)}
                  disabled={savedIds.has(book.id)}
                  className={`mt-2 w-full rounded-lg py-2 text-sm font-medium ${savedIds.has(book.id) ? 'bg-mocha/10 text-[#3E2723]/60 cursor-not-allowed' : 'bg-mocha/20 text-[#3E2723] hover:bg-mocha/30'}`}
                >
                  {savedIds.has(book.id) ? 'Saved' : 'Save to My Books'}
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">No books available.</p>
          )}

          {/* Shimmer when loading more */}
          {isLoadingMore && (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={`more-${i}`} className="rounded-[10px] p-5 bg-[#F0E2C6] animate-pulse">
                <div className="w-full h-[150px] bg-black/10 rounded-[10px]" />
                <div className="mt-3 h-4 bg-black/10 rounded w-3/4" />
                <div className="mt-2 h-4 bg-black/10 rounded w-1/2" />
                <div className="mt-4 h-8 bg-black/10 rounded" />
              </div>
            ))
          )}

          {/* Sentinel for infinite scroll */}
          <div ref={observerRef} className="col-span-full h-1" />
        </div>
      )}

      {/* Pagination controls */}
      {!loading && !error && (
        <div className="flex justify-center items-center gap-4 my-6">
          <button
            className="px-4 py-2 rounded bg-mocha/20 text-mocha disabled:opacity-40"
            disabled={pageIndex === 0}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setPageIndex((p) => Math.max(0, p - 1));
              setBooks((prev) => prev.slice(0, Math.max(0, prev.length - PAGE_SIZE)));
            }}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 rounded bg-mocha text-sand disabled:opacity-40 flex items-center gap-2"
            disabled={!hasMore || isLoadingMore}
            onClick={() => setPageIndex((p) => p + 1)}
          >
            {isLoadingMore && (
              <span className="inline-block h-4 w-4 border-2 border-sand/70 border-t-transparent rounded-full animate-spin" />
            )}
            <span>Next</span>
          </button>
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
              <button onClick={handleAddToCart} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">View in My Books</button>
              <button onClick={() => handleSaveBook(selectedBook)} className="bg-[#D8C3A5] rounded-[10px] py-2 px-3">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


