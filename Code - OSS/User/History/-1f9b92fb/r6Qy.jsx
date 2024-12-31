import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './CodeCompiler.css'; // Import CSS for styling

const CodeCompiler = () => {
    const [code, setCode] = useState('// Write your code here');
    const [output, setOutput] = useState('');
    const [theme, setTheme] = useState('vs-dark'); // Default theme

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
                setOutput(`Output: ${result.output}\nStatus: ${result.isCorrect}`);
            }
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        }
    };

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    
    const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault(); 
            handleCompile(); 
        }
    };

    // Attach the keydown event listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="code-compiler">
            <h1>Code Compiler</h1>

            {/* Dropdown for theme selection */}
            <div className="theme-dropdown">
                <label htmlFor="theme-select">Theme:</label>
                <select id="theme-select" value={theme} onChange={handleThemeChange}>
                    <option value="vs-light">Light</option>
                    <option value="vs-dark">Dark</option>
                    <option value="hc-black">High Contrast</option>
                </select>
            </div>

            <Editor
                height="50vh"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme={theme}
            />
            <button onClick={handleCompile}>Run Code</button>
            
            <pre>{output}</pre>
        </div>
    );
};

export default CodeCompiler;
