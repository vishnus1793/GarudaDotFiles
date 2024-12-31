import React from 'react';
import AceEditor from 'react-ace';
import './CodeEditor.css';

// Importing language modes for syntax highlighting
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp'; // Covers both C and C++
import 'ace-builds/src-noconflict/mode-java';

// Importing editor theme
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ language, code, setCode }) => {
  return (
    <div className="code-editor-container">
      <AceEditor
        mode={language}               // Sets the editor mode based on selected language
        theme="monokai"                // Editor theme
        onChange={(newCode) => setCode(newCode)}
        fontSize={16}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          useWorker: false,           // Disables web workers to prevent unnecessary errors
        }}
        className="w-full h-[60vh]"
      />
      <div className="editor-footer">
        Language: {language}           {/* Optional footer for language display */}
      </div>
    </div>
  );
};

export default CodeEditor;
