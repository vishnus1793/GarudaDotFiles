import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

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

    // Function to handle keydown events
    const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action (like a new line)
            handleCompile(); // Call the compile function
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
        <div>
            <h2>Code Compiler</h2>
            <select onChange={handleThemeChange} value={theme}>
                <option value="light">Light</option>
                <option value="vs-dark">Dark</option>
                <option value="hc-black">High Contrast</option>
            </select>
            <Editor
                height="400px"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme={theme} // Set the selected theme
            />
            <button onClick={handleCompile}>Run Code</button>
            <div>
                <h3>Output:</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeCompiler;
