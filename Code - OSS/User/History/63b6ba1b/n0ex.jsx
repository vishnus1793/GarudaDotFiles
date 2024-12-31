import React, { useEffect, useRef, useState } from 'react';
import './Result.css'; 
const Result = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [userId, setUserId] = useState(Date.now());
    const [numRecords, setNumRecords] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8000/ws/${userId}`);

        ws.current.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        return () => {
            ws.current.close();
        };
    }, [userId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input) {
            ws.current.send(input);
            setInput('');
        }
    };

    const getPreviousConversation = () => {
        ws.current.send(`get_previous_conversation ${userId} ${numRecords}`);
    };

    const getAllConversations = () => {
        ws.current.send(`get_all_conversations ${userId}`);
    };

    return (
        <div className="container mt-3">
            <div className="header">
            <h1>FastAI ChatBot</h1>
            <h2>Get Previous Conversation</h2>
            <form onSubmit={getPreviousConversation}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Number of Records"
                    value={numRecords}
                    onChange={(e) => setNumRecords(e.target.value)}
                /><br />
                <button type="submit" className="btn btn-outline-primary mt-2">Get Previous Conversation</button>
                <button type="button" className="btn btn-outline-primary mt-2" onClick={getAllConversations}>Get All Conversations</button>
            </form>
            </div>
            <div id="conversation-history">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <h2>Chat</h2>
            
            <form onSubmit={sendMessage}>
                
            </form>
            <div className="chat-container">
            <div className="chat-header">
                <h2>How can GPT help you today?</h2>
            </div>


            

            <div className="chat-input-container">
            <textarea
  value={input}
  onChange={(e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';  // Reset height to auto to calculate the new height
    e.target.style.height = e.target.scrollHeight + 'px';  // Set the height based on content
  }}
  placeholder="Type your message here..."
  className="chat-input"
  rows="1" // Default to 1 row
  style={{ overflowY: 'hidden' }}  // Prevent the vertical scrollbar until necessary
/>

                <button onClick={sendMessage} className="send-btn">
                    Send
                </button>
            </div>
        </div>

        </div>
        
    );
};

export default Result;
