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
        navigate('/question')
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
      <h1>Upload PDF</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      
      {response && (
        <div>
          <h2>Response:</h2>
          <p>Status: {response.status}</p>
          <p>Output Path: {response.output_path}</p>
          <p>Report Content Preview: {response.report_content}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default UploadPdf;
