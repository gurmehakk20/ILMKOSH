import React, { useState } from "react";
import axios from "axios";

const UploadBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/books/upload`;
      const response = await axios.post(apiUrl, formData, config);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-[#F0E2C6] rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#3E2723] mb-6 text-center">
          Upload Your Book
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-[#efebde] text-base focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-[#efebde] text-base resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
          ></textarea>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-[#efebde] text-base focus:outline-none focus:ring-2 focus:ring-[#3E2723]"
          />

          <button
            type="submit"
            className="w-full py-3 text-white text-lg font-medium rounded-md bg-gradient-to-r from-[#3E2723] to-[#867A6B] hover:from-[#867A6B] hover:to-[#3E2723] transition-all duration-300 shadow-md"
          >
            Upload
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-base text-gray-800">{message}</p>
        )}
      </div>
    </div>
  );
};

export default UploadBook;
