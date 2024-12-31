const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const wsPort = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample Tokenizer
const tokenize = (code, language) => {
  // Basic tokenizer; extend as needed for different languages.
  const tokens = code.split(/\s+/).map((word, index) => ({
    type: isNaN(word) ? 'IDENTIFIER' : 'NUMBER',
    value: word,
    index,
  }));
  return tokens;
};

// WebSocket Server for Real-Time Lexical Analysis
const wss = new WebSocket.Server({ port: wsPort });
wss.on('connection', (ws) => {
  console.log('Client connected for real-time analysis');

  ws.on('message', (message) => {
    const { code, language } = JSON.parse(message);
    const tokens = tokenize(code, language);
    ws.send(JSON.stringify({ tokens }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server running on ws://localhost:${wsPort}`);

// HTTP Endpoint for Code Evaluation
app.post('/evaluate', (req, res) => {
  const { code, language } = req.body;
  try {
    // Here you might want to run code with a specific interpreter, e.g., Python or Node.
    // Basic example: returning tokens (extendable for syntax or output-based evaluation).
    const tokens = tokenize(code, language);
    res.json({ success: true, tokens });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
});
