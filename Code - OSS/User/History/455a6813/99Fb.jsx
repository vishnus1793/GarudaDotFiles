import React from 'react';
import AceEditor from 'react-ace';
import './CodeEditor.css'; // Import the CSS file here

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';

import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ language, code, setCode }) => {
  return (
    <div className="code-editor-container">
      <AceEditor
        mode={language}
        theme="monokai"
        onChange={(newCode) => setCode(newCode)}
        fontSize={16}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          useWorker: false, // Disable web workers for code execution
        }}
        className="w-full h-[60vh]"
      />
      <div className="editor-footer">
        {/* Optional footer content like language display or line count */}
        Language: {language}
      </div>
    </div>
  );
};

export default CodeEditor;
