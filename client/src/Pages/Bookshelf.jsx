import React, { useState } from "react";
import bgImg from "../assets/bgImg.jpg";
import { useNavigate } from "react-router-dom";

const genres = [
  { name: "Fiction", gradient: "linear-gradient(145deg, #3E2723, #5D4037)", urdu: "افسانہ" },
  { name: "Mystery", gradient: "linear-gradient(145deg, #4B2E2E, #6D3F3F)", urdu: "پراسرار" },
  { name: "Sci-Fi", gradient: "linear-gradient(145deg, #D8C3A5, #BFA988)", urdu: "سائنس فکشن" },
  { name: "Romance", gradient: "linear-gradient(145deg, #E97451, #FF8C69)", urdu: "رومانوی" },
  { name: "Biography", gradient: "linear-gradient(145deg, #3E2723, #5D4037)", urdu: "سوانح حیات" },
  { name: "History", gradient: "linear-gradient(145deg, #4B2E2E, #6D3F3F)", urdu: "تاریخ" },
  { name: "Philosophy", gradient: "linear-gradient(145deg, #D8C3A5, #BFA988)", urdu: "فلسفہ" },
  { name: "Poetry", gradient: "linear-gradient(145deg, #E97451, #FF8C69)", urdu: "شاعری" },
];

const Bookshelf = () => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre}`);
  };

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y, index });
  };

  const getTransform = (index) =>
    hoveredBook === index
      ? `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) scale(1.08)`
      : "rotateX(0deg) rotateY(0deg) scale(1)";

  return (
    <div className="relative  flex flex-col items-center justify-center px-6 py-20 mt-0 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 w-[80%] justify-center mx-auto rounded-3xl overflow-hidden pointer-events-none ">
        {/* Subtle parchment gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E7] via-[#F7ECD3] to-[#EAD9B0]" />

        {/* Removed background image overlay to avoid global background conflicts */}

        {/* Vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00000033] via-transparent to-[#00000055]" />
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif mb-6 text-[#3E2723] drop-shadow-[0_0_12px_rgba(62,39,35,0.4)] tracking-wide relative z-10">
        EXPLORE GENRES
      </h1>
      <div className="w-40 h-1 bg-gradient-to-r from-[#3E2723] via-[#4B2E2E] to-[#3E2723] rounded-full mb-16 relative z-10" />

      {/* Genre Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-7xl relative z-10">
        {genres.map((genre, index) => (
          <div
            key={genre.name}
            onMouseEnter={() => setHoveredBook(index)}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={() => handleGenreClick(genre.name)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className="relative cursor-pointer rounded-3xl shadow-2xl p-10 text-white font-serif flex justify-center items-center transform-gpu transition-all duration-300 ease-out overflow-hidden"
            style={{
              background: genre.gradient,
              transform: getTransform(index),
              boxShadow:
                hoveredBook === index
                  ? "0px 0px 40px rgba(0,0,0,0.7), inset 0px 0px 15px rgba(255,255,255,0.15)"
                  : "0px 6px 20px rgba(0,0,0,0.4)",
            }}
          >
            {/* Genre Title */}
            <div
              className={`text-center text-2xl sm:text-3xl md:text-4xl font-bold relative z-10 transition-colors duration-300 ${
                hoveredBook === index ? "text-[#FFF6E5]" : "text-[#F0E2C6]"
              }`}
            >
              {hoveredBook === index ? genre.urdu : genre.name}
            </div>

            {/* Animated shimmer sweep */}
            {hoveredBook === index && (
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2s_linear_infinite]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* shimmer keyframes */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default Bookshelf;
