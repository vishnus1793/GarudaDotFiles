// 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Define the test case you want to check against
//const testCaseInput = "2";  
const expectedOutput = "6"; 

app.post('/compile', (req, res) => {
    const { code } = req.body;

    // Run the code in a child process
    exec(`node -e "${code}"`, (error, stdout, stderr) => {
        if (error) {
            return res.json({ error: stderr });
        }

        const output = stdout.trim();

        // Check if the output matches the expected output
        const isCorrect = output === expectedOutput ? 'Correct' : 'Incorrect';
        
        res.json({
            output,
            isCorrect
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
