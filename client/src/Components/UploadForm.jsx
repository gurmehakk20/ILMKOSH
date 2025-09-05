import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  const handleUpload = async (event) => {
    event.preventDefault();
  
    if (!file) {
      setMessage('Please select a file to upload.');
      setIsSuccess(false);
      return;
    }
  
    const token = localStorage.getItem('token');
  
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
  
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/books/upload`;
      console.log(`Uploading to: ${apiUrl}`);
      console.log('FormData:', formData);
      const response = await axios.post(apiUrl, formData, config);
  
      setMessage(response.data.message);
      setIsSuccess(true);
      // Reset form after successful upload
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file. ' + (error.response?.data?.message || ''));
      setIsSuccess(false);
    }
  };

  return (
    <div className="upload-book-container">
      <h2>Upload a Book</h2>
      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter book title"
          />
        </div>
        
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter book description"
            rows="4"
          />
        </div>
        
        <div>
          <label htmlFor="file">Book File (PDF)</label>
          <div className="file-input-container">
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept=".pdf"
              required
            />
            {file && <div className="file-name">Selected: {file.name}</div>}
          </div>
        </div>
        
        <button type="submit">Upload Book</button>
      </form>
      
      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadForm;