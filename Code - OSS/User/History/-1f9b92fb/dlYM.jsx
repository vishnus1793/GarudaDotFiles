import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeCompiler = () => {
    const [code, setCode] = useState('// Write your code here');
    const [output, setOutput] = useState('');

    const handleCompile = async () => {
        try {
            const response = await fetch('http://localhost:5000/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const result = await response.json();
            if (result.error) {
                setOutput(`Error: ${result.error}`);
            } else {
                setOutput(`Output: ${result.output}`);
            }
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        }
    };

    const handleEditorChange = (value) => {
        setCode(value);
    };

    return (
        <div className="editor-container">
            <div className="editor-content">
                <Editor
                    height="70vh"
                    language="java" // Set the language to Java if needed
                    value={code}
                    theme="vs-dark"
                    onChange={handleEditorChange}
                />
            </div>
            <div className="button-container">
                <button onClick={handleCompile} className="compile-button">
                    Run Code
                </button>
            </div>
            <div className="output-container">
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeCompiler;
