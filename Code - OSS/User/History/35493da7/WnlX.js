const express = require('express');
const bodyParser = require('body-parser');
const { VM } = require('vm2'); // For safely running user code

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

/**
 * Endpoint to compile and evaluate user code
 */
app.post('/compile', (req, res) => {
    const { code } = req.body;

    // Define test cases
    const testCases = [
        { input: [2, 3, -2, 4], expected: 6 },
        { input: [-2, 0, -1], expected: 0 },
        { input: [-2, 3, -4], expected: 24 },
        { input: [0, 2], expected: 2 },
        { input: [-1, -2, -3, 0], expected: 3 },
    ];

    // Prepare the code to be executed
    const userCode = `
        const maxProduct = ${code};
        const runTests = (testCases) => {
            return testCases.map(({ input, expected }) => {
                const result = maxProduct(input);
                return { input, expected, result, isCorrect: result === expected };
            });
        };
        runTests(${JSON.stringify(testCases)});
    `;

    const vm = new VM({
        timeout: 1000, // 1 second timeout
        sandbox: {},
    });

    try {
        const testResults = vm.run(userCode);
        res.json({ output: testResults });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
