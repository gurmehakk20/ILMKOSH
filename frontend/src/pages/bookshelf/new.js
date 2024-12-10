import React, { useState } from 'react';
import './bookshelf.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const genres = [
  { name: 'Fiction', color: '#3E2723', urdu: 'افسانہ' },
  { name: 'Mystery', color: '#4B2E2E', urdu: 'پراسرار' },
  { name: 'Sci-Fi', color: '#D8C3A5', urdu: 'سائنس فکشن' },
  { name: 'Romance', color: '#E97451', urdu: 'رومانوی' },
  { name: 'Biography', color: '#3E2723', urdu: 'سوانح حیات' },
  { name: 'History', color: '#4B2E2E', urdu: 'تاریخ' },
  { name: 'Philosophy', color: '#D8C3A5', urdu: 'فلسفہ' },
  { name: 'Poetry', color: '#E97451', urdu: 'شاعری' },
];

const Ilmkosh = () => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const [setData]=useState([]);
  const redirectToGenre = (genre) => {
    if(evt.key==="click")
      {
          axios.get('https://www.googleapis.com/books/v1/volumes?q='+free+'&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=40')
          .then(res=>setData(res.data.items))
          .catch(err=>console.log(err))
          navigate(`/genre/${genre}`);
      }

     // Navigate to the genre page
  };

  return (
    <div className="ilmkosh">
      <div className="bookshelf">
        {genres.map((genre, index) => (
          <div
          key={genre.name}
          className="book"
          style={{
            backgroundColor: genre.color,
            color: '#FFD700',// Gold text for a royal look
            fontFamily: 'Georgia, serif',// A more royal, elegant font
          }}
          onMouseEnter={() => setHoveredBook(index)}
          onMouseLeave={() => setHoveredBook(null)}
          onClick={() => redirectToGenre(genre.name)}
        >
          <span className="book-title">
            {hoveredBook === index ? genre.urdu : genre.name}
          </span>
          {hoveredBook === index && (
            <div className="book-info">
              {/* <h3>{genre.name}</h3> */}
            </div>
          )}
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default Ilmkosh;
