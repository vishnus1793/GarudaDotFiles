import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import './CodeEditor.css';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';

const CodeEditor = ({ language, code, setCode }) => {
  const [theme, setTheme] = useState('monokai');
  const [tokens, setTokens] = useState([]);
  const [ws, setWs] = useState(null);

  // WebSocket setup for real-time lexical analysis
  useEffect(() => {
    const wsConnection = new WebSocket('ws://localhost:8080');
    setWs(wsConnection);

    wsConnection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTokens(data.tokens);
    };

    return () => {
      wsConnection.close();
    };
  }, []);

  // Function to send code to WebSocket for real-time tokenization
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ code: newCode, language }));
    }
  };

  // Function to send code to the backend for evaluation
  const handleEvaluate = async () => {
    try {
      const response = await fetch('http://localhost:5000/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const result = await response.json();
      if (result.success) {
        setTokens(result.tokens);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error evaluating code:', error);
    }
  };

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <label htmlFor="theme-selector">Select Theme: </label>
        <select
          id="theme-selector"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="monokai">Monokai</option>
          <option value="github">GitHub</option>
          <option value="solarized_dark">Solarized Dark</option>
          <option value="solarized_light">Solarized Light</option>
        </select>
      </div>

      <AceEditor
        mode={language}
        theme={theme}
        onChange={handleCodeChange}
        fontSize={16}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{ useWorker: false }}
        className="w-full h-[60vh]"
      />

      <button onClick={handleEvaluate} className="evaluate-button">
        Evaluate Code
      </button>

      <div className="editor-footer">
        <p>Tokens:</p>
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              {token.type}: {token.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CodeEditor;
