import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import OutputConsole from './components/OutputConsole';
import { compileCode } from './services/compileService';
import './App.css';  // Make sure to import your CSS

const App = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleCompile = async () => {
    const result = await compileCode(language, code, input);
    setOutput(result.output);
  };

  return (
    <div className="App">
      <h1>Multi-Language Compiler</h1>
      <div className="compiler-container">
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
        <CodeEditor language={language} code={code} setCode={setCode} />
        <textarea
          className="input-box"
          placeholder="Program Input"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={handleCompile}>Compile & Run</button>
        <OutputConsole output={output} />
      </div>
    </div>
  );
};

export default App;
