const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Define the test cases you want to check against
const testCases = [
    { input: "2", expectedOutput: "6" },
    { input: "3", expectedOutput: "9" },
    { input: "4", expectedOutput: "12" }
];

app.post('/compile', (req, res) => {
    const { code } = req.body;

    // Function to run each test case
    const runTestCase = (testCase) => {
        return new Promise((resolve) => {
            exec(`node -e "${code.replace('INPUT', testCase.input)}"`, (error, stdout, stderr) => {
                if (error) {
                    return resolve({ input: testCase.input, error: stderr });
                }

                const output = stdout.trim();
                const isCorrect = output === testCase.expectedOutput ? 'Succeed' : 'Failed';

                resolve({
                    input: testCase.input,
                    output,
                    expectedOutput: testCase.expectedOutput,
                    isCorrect
                });
            });
        });
    };

    // Run all test cases
    Promise.all(testCases.map(runTestCase))
        .then(results => {
            res.json({ results });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
