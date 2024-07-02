import React, { useEffect, useState } from "react";
import webSocketService from "../services/webSocketService";

const UserDashboard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Add a message listener to update the state with new messages
    webSocketService.onMessageReceived = (message) => {
      const salesMessage = message.body;
      setMessages((prevMessages) => [...prevMessages, salesMessage]);
    };
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>
        <h2>Sales Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
