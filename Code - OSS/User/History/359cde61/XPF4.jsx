import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import QuestionPanel from './components/QuestionPanel';
import CodeCompiler from './components/CodeCompiler';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question" element={<QuestionPanel/>}/>
      <Route path="/CodeCompiler" element={<CodeCompiler/>}/>
    </Routes>
    </Router>
  );
}

export default App;
