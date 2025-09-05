import React from 'react';
import bgImg from './assets/bgImg.jpg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import Register from './Pages/Register';
// import Register from './pages/auth/Register';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import GenrePage from './Pages/GenrePage';
import NewBooks from './Pages/genres/NewBooks.jsx';
import UploadBook from './Pages/UploadBook';
import MyBooks from './Pages/MyBooks';
import Bookshelf from './Pages/Bookshelf';
function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="w-screen ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<ProtectedRoute><UploadBook /></ProtectedRoute>} />
          <Route path="/bookshelf" element={<ProtectedRoute><Bookshelf /></ProtectedRoute>} />
          <Route path="/genre/:genre" element={<GenrePage />} />
          <Route path="/new" element={<NewBooks />} />
          <Route path="/mybooks" element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />

        </Routes>
      </div>

    </div>
  );
}

export default App;

