import React, { useEffect, useRef, useState } from 'react';
import './Result.css'; // Ensure you import the CSS file

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
        <div className="container">
            <div className="header">
                <h2>FastAI ChatBot</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number of Records"
                    value={numRecords}
                    onChange={(e) => setNumRecords(e.target.value)}
                />
                <button onClick={getPreviousConversation}>Get Previous Conversation</button>
                <button onClick={getAllConversations}>Get All Conversations</button>
            </div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Chat"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Result;
