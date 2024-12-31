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
        <div className="chat-container">
            <h1 className="chat-title">FastAI ChatBot</h1>
            <div className="record-controls">
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                    className="record-input"
                />
                <input
                    type="number"
                    value={numRecords}
                    onChange={(e) => setNumRecords(e.target.value)}
                    placeholder="Number of records"
                    className="record-input"
                />
                <button onClick={getPreviousConversation} className="control-btn">Get Previous Conversation</button>
                <button onClick={getAllConversations} className="control-btn">Get All Conversations</button>
            </div>

            <div className="conversation-box">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>

            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="chat-input"
                />
                <button onClick={sendMessage} className="send-btn">
                    Send
                </button>
            </div>

            <div className="suggestions">
                <h2 className="suggestions-title">How can Claude help you today?</h2>
                <span className="suggestions-subtitle">Claude 3.5 Sonnet (New)</span>
                <div className="suggestions-buttons">
                    <button>Provide stakeholder perspective</button>
                    <button>Extract insights from report</button>
                    <button>Summarize meeting notes</button>
                </div>
            </div>
        </div>
    );
};

export default Result;
