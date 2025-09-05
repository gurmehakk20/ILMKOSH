import React, { useState } from 'react';
import ilm from '../assets/ilm.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      name: name,
      email: email,
      password: password,
    };
  
    console.log('Sending data:', data); // Log data to ensure it’s correct
  
    axios.post(`${import.meta.env.VITE_API_URL}/user/register`, data)
      .then((response) => {
        setMessage('Registration successful!');
        console.log('Registration successful!');
        console.log('User Entered Values:', data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', (response.data.user));
          navigate('/new', { replace: true });
         // 2-second delay
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'There was an error registering. Please try again.';
        setMessage(errorMessage);
        console.error('There was an error registering!', error);
      });
  };

  return (
    <div >
      <div className="text-center">
        <div className="w-[300px] mx-auto p-0">
          <div className="main">
            <img className="w-[200px] h-auto p-0 mt-0 mx-auto" src={ilm} alt="Logo" />
          </div>
        </div>
      </div>

      <div className="mt-0 w-[300px] mx-auto p-5 rounded-[25px] shadow-sm bg-[#867A6B]">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-1" htmlFor="name">Name</label>
          <br />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your Name"
            id="name"
            name="name"
            required
            className="mb-0 p-2 border border-[#ccc] rounded-[10px]"
          />
          <br />
          <label className="mb-1" htmlFor="email">Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            id="email"
            name="email"
            required
            className="mb-0 p-2 border border-[#ccc] rounded-[10px]"
          />
          <br />
          <label className="mb-1" htmlFor="password">Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter a Password"
            id="password"
            name="password"
            required
            className="mb-0 p-2 border border-[#ccc] rounded-[10px]"
          />
          <br />
          <button type="submit" className="py-2 px-2 rounded bg-gradient-to-r from-[#332620] to-[#C0B69D] text-white cursor-pointer">Register</button>
          <br />
          <p className="text-center">
            Already have an account? <a className="text-[#332620]" href="login">Login</a>
          </p>
          {message && <p className="text-green-600 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
