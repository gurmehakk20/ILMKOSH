// import logo from '../public/images/logo_text.png';

import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo_text.png";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="sticky top-0 z-[1000]">
      <div className={`w-[95%] md:w-[90%] mx-auto ${isScrolled ? 'h-14 md:h-14 shadow-2xl bg-sand/95' : 'h-14 md:h-16 shadow-lg bg-sand/90'} px-3 md:px-4 flex items-center justify-between backdrop-blur-md border border-mocha/40 ring-1 ring-white/10 rounded-xl transition-all duration-200 ease-out relative z-[1001]`}>
        {/* Logo */}
        <div className="h-full ml-2 md:ml-4 flex items-center">
          <img className="h-8 md:h-10 w-auto" src={logo} alt="Logo" />
        </div>

        {/* Bottom accent line */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mocha/40 to-transparent" />

        {/* Hamburger */}
        <button
          className={`inline-flex md:hidden p-2 z-10 ${isMenuOpen ? "text-mocha" : "text-mocha"}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <RxHamburgerMenu />
        </button>

        {/* Backdrop */}
        {isMenuOpen && <div className="fixed inset-0 bg-black/30 z-[900] md:hidden" onClick={toggleMenu}></div>}

        {/* Navigation */}
        <div className={`hidden md:flex items-center gap-2 md:gap-3`}>
          <div className="flex items-center gap-2 md:gap-3 text-mocha">
            <NavLink className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-colors duration-200 ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40`} onClick={toggleMenu} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-colors duration-200 ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40`} onClick={toggleMenu} to="/mybooks">My Books</NavLink>
            <NavLink className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-colors duration-200 ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40`} onClick={toggleMenu} to="/bookshelf">Bookshelf</NavLink>
            <NavLink className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-colors duration-200 ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40`} onClick={toggleMenu} to="/upload">Upload Books</NavLink>
          </div>
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <NavLink className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-colors duration-200 ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40`} onClick={toggleMenu} to="/login">Login</NavLink>
                <NavLink className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-colors duration-200 ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40`} onClick={toggleMenu} to="/register">Sign Up</NavLink>
              </>
            ) : (
              <button onClick={handleLogout} className="px-3 py-1.5 rounded-lg text-mocha hover:bg-mocha/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40">Logout</button>
            )}
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden fixed top-0 right-0 h-screen w-4/5 max-w-xs bg-sand/95 backdrop-blur-md border-l border-mocha/40 shadow-2xl z-[950] transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col gap-2 p-6 text-mocha">
            <NavLink className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} transition-colors`} onClick={toggleMenu} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} transition-colors`} onClick={toggleMenu} to="/mybooks">My Books</NavLink>
            <NavLink className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} transition-colors`} onClick={toggleMenu} to="/bookshelf">Bookshelf</NavLink>
            <NavLink className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} transition-colors`} onClick={toggleMenu} to="/upload">Upload Books</NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} transition-colors`} onClick={toggleMenu} to="/login">Login</NavLink>
                <NavLink className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-mocha/20 font-semibold' : 'hover:bg-mocha/10'} transition-colors`} onClick={toggleMenu} to="/register">Sign Up</NavLink>
              </>
            ) : (
              <button onClick={handleLogout} className="px-3 py-2 rounded-lg hover:bg-mocha/10 text-left">Logout</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
