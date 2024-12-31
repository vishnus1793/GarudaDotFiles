import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeCompiler = () => {
    const [code, setCode] = useState('// Write your code here');

    const handleCompile = () => {
        // For the purpose of this example, we can use `eval` to run JavaScript code.
        // WARNING: Avoid using `eval` in production for security reasons.
        try {
            // eslint-disable-next-line no-eval
            const result = eval(code);
            alert(`Output: ${result}`);
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleEditorChange = (value) => {
        setCode(value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: 1, padding: '10px' }}>
                <Editor
                    height="70vh"
                    defaultLanguage="javascript"
                    defaultValue="// Write your code here"
                    theme="vs-dark"
                    onChange={handleEditorChange}
                />
            </div>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleCompile} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Run Code
                </button>
            </div>
        </div>
    );
};

export default CodeCompiler;
