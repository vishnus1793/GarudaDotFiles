import React, { useEffect, useRef, useState } from 'react';
import './Result.css';

const Result = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [userId, setUserId] = useState(Date.now());
    const [numRecords, setNumRecords] = useState('');
    const ws = useRef(null);
    const messagesEndRef = useRef(null);  // For scrolling to the latest message

    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8000/ws/${userId}`);

        ws.current.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        return () => {
            ws.current.close();
        };
    }, [userId]);

    useEffect(() => {
        scrollToBottom();  // Scroll to the latest message when new messages are added
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input) {
            // Add the message to the state
            setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);

            // Send the message to WebSocket
            ws.current.send(input);

            setInput('');  // Clear input after sending
        }
    };

    const getPreviousConversation = () => {
        ws.current.send(`get_previous_conversation ${userId} ${numRecords}`);
    };

    const getAllConversations = () => {
        ws.current.send(`get_all_conversations ${userId}`);
    };

    // Scroll to the bottom of the message container
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="chat-container">
            <div className="chat-title">FastAI ChatBot</div>

            <div className="previous-conversation-section">
                <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Number of Records"
                    value={numRecords}
                    onChange={(e) => setNumRecords(e.target.value)}
                />
                <button onClick={getPreviousConversation}>Get Previous Conversation</button>
                <button onClick={getAllConversations}>Get All Conversations</button>
            </div>

            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        {msg}
                    </div>
                ))}
                <div ref={messagesEndRef} />  {/* Scroll target */}
            </div>

            <div className="input-section">
                <textarea
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        e.target.style.height = 'auto';  // Reset height to auto
                        e.target.style.height = `${e.target.scrollHeight}px`;  // Adjust height based on content
                    }}
                    placeholder="Type your message here..."
                    className="chat-input"
                    rows="1"
                    style={{ overflowY: 'hidden' }}
                />
                <button onClick={sendMessage} className="send-btn">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Result;
