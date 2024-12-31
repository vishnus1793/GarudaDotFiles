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
          className="fileFront"
          width="85%"
          height="auto"
          viewBox="0 0 10 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '8px' }}
        >
          <path
            d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
            fill="url(#paint0_linear_117_5)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_117_5"
              x1="38.7619"
              y1="8.71323"
              x2="66.9106"
              y2="82.8317"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C3BBFF" />
              <stop offset="1" stopColor="#51469A" />
            </linearGradient>
          </defs>
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
