import React, { useState } from 'react';
import ilm from '../assets/ilm.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      // Make a POST request to the /login endpoint
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });
  
      if (response.data.success) {
        console.log('Login successful:', response.data); // Debugging
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', (response.data.user));
        navigate('/new');
        window.location.reload(); 
   
         // Redirect after successful login
      } else {
        console.log('Login failed:', response.data.message); // Debugging
        setError(response.data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message); // Debugging
      setError('Error logging in. Please try again.');
    }
  };
  

  return (
    <>
      <div className="login-container">
        <div className="text-center">
          <div className="w-[300px] mx-auto p-0">
            <div className="main">
              <img className="w-[200px] h-auto p-0 mt-0 mx-auto" src={ilm} alt="Logo" />
            </div>
          </div>
        </div>

        <div className="mt-0 w-[300px] mx-auto p-5 rounded-[25px] shadow-sm bg-[#867A6B]">
          <form className="flex flex-col" onSubmit={handleLogin}>
            <label className="mb-1" htmlFor="email">Email</label><br />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-[-10px] p-2 border border-[#ccc] rounded"
            /><br />
            <label className="mb-1" htmlFor="password">Password</label><br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-[-10px] p-2 border border-[#ccc] rounded"
            /><br />
            <label htmlFor="remember-me" className="inline-flex items-center"><input className="mr-2" type="checkbox" id="remember-me" name="remember-me" />Remember me</label><br />
            <button type="submit" className="py-2 px-2 rounded bg-gradient-to-r from-[#332620] to-[#C0B69D] text-white cursor-pointer">Login</button><br />
            {error && <p className="text-red-600">{error}</p>}
            <a href="/forgot.html" className="text-[#332620]">Forgot Password?</a><br />
            <p className="text-center">Don't have an account?
              <Link to="/register" className="text-[#332620]"> Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
