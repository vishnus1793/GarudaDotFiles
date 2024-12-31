import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeCompiler from './CodeCompiler';

const QuestionPanel = ({ setQuestionId }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/questions');
        if (response.data.length > 0) {
          setQuestion(response.data[0]);
          setQuestionId(response.data[0]._id); // Set the question ID
        } else {
          setError('No questions found.');
        }
      } catch (err) {
        setError('Failed to fetch questions.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [setQuestionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCodeSubmission = async (code) => {
    // You can add logic here to handle the code submission (e.g., making an API request)
    console.log(`Submitting code for question ID ${question._id}:`, code);
  };

  return (
    <div>
      <h2>Question</h2>
      <p>{question.question}</p>
      <h3>Test Cases:</h3>
      <ul>
        {question.testCases.map((testCase, index) => (
          <li key={index}>
            <strong>Input:</strong> {testCase.input} <br />
            <strong>Expected Output:</strong> {testCase.output.trim()}
          </li>
        ))}
      </ul>
      
      {/* Integrate the CodeCompiler component here */}
      <CodeCompiler questionId={question._id} onSubmit={handleCodeSubmission} />
    </div>
  );
};

export default QuestionPanel;
