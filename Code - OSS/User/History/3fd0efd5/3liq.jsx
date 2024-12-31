// src/PdfUpload.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPdf = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data);
        setError(null);
        navigate('/question');
      } else {
        setError(data.error);
        setResponse(null);
      }
    } catch (err) {
      setError('Error uploading file');
      setResponse(null);
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <label htmlFor="file-upload" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '8px' }}
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            fill="#000"
          />
        </svg>
        Browse
      </label>
      <button onClick={handleUpload}>Upload</button>

      {response && (
        <div>
          <h3>Response:</h3>
          <p>Status: {response.status}</p>
          <p>Output Path: {response.output_path}</p>
          <p>Report Content Preview: {response.report_content}</p>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default UploadPdf;
