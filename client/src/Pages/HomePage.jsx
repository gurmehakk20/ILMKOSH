import React from 'react';
import bgImg from '../assets/bgImg.jpg';
import logoNoBg from '../assets/logo_nobg.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center overflow-hidden">
      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center pointer-events-none max-w-screen overflow-hidden">
        <img
          src={logoNoBg}
          alt="Logo"
          className="w-48 sm:w-60 md:w-72 lg:w-96 h-auto max-w-full object-contain"
        />

      </div>

      {/* Hero content */}
      <div className="flex-1 flex flex-col justify-center items-center z-10 text-center px-4">
        <h1 className="text-sand text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          TREASURE OF KNOWLEDGE
        </h1>
        <Link to="/new">
          <button className="bg-sand text-mocha text-lg font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
