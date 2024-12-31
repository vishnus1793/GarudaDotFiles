import React, { useState } from 'react';
import AceEditor from 'react-ace';
import './CodeEditor.css';

// Importing language modes for syntax highlighting
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';

// Importing editor themes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';

const CodeEditor = ({ language, setLanguage }) => {
  const [theme, setTheme] = useState('monokai'); // Default theme
  const [code, setCode] = useState({
    python: '',
    javascript: '',
    c_cpp: '',
    java: '',
  });

  const handleLanguageChange = (newLanguage) => {
    // Set the selected language
    setLanguage(newLanguage);
    
    // If switching to a language, update the code based on the selected language
    setCode((prevCode) => ({
      ...prevCode,
      [newLanguage]: prevCode[newLanguage] || '', // Keep the existing code if available
    }));
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
        onChange={(newCode) => setCode((prev) => ({ ...prev, [language]: newCode }))}
        fontSize={16}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={code[language]} // Get the code based on the selected language
        setOptions={{
          useWorker: false, // Disables web workers to prevent unnecessary errors
        }}
        className="w-full h-[60vh]"
      />
      <div className="editor-footer">
        Language: {language} {/* Optional footer for language display */}
      </div>
    </div>
  );
};

export default CodeEditor;
