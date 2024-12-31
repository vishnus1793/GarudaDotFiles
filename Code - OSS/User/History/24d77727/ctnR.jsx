import React from 'react';
import './QuestionPanel.css';

const QuestionPanel = () => {
    return (
        <div className="question-panel">
            <h1><b>Maximum Product Subarray</b></h1>
            <p>
                Given an integer array `nums`, find a subarray that has the largest product, and return the product.
                The test cases are generated so that the answer will fit in a 32-bit integer.
            </p>
            <h3>Example 1:</h3>
            Input: nums = [2,3,-2,4]<br />
            Output: 6<br />
            Explanation: [2,3] has the largest product 6.<br />
            <h3>Example 2:</h3>
            Input: nums = [-2,0,-1]<br />
            Output: 0<br />
            Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
        </div>
    );
};

export default QuestionPanel;
