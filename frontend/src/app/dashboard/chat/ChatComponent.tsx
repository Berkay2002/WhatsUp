// src/app/dashboard/chat/ChatComponent.tsx
"use client"; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000"); // Ensure this matches your server URL

export default function ChatComponent() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage) {
      socket.emit('message', newMessage);
      setNewMessage(''); // Clear input field
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)} 
        placeholder="Type a message" 
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
