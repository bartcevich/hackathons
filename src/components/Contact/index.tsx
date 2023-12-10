'use client';
import React, { useEffect, useState } from 'react';

interface VKMessage {
  id: number;
  title: string;
  body: string;
  userId: number;
  // Add any other properties you expect in the VK message item
}

const Index = () => {
  const [messages, setMessages] = useState<VKMessage[]>([]);

  useEffect(() => {
    fetchVKMessages();
  }, []);

  const fetchVKMessages = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      const data = await response.json();
      console.log(data);
      if (data.length>0) {
        setMessages(data);
      } else {
        console.error('Error fetching VK messages');
      }
    } catch (error) {
      console.error('Error fetching VK messages:', error);
    }
  };

  return (
    <div>
      <h1>Last 3 VK Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id.toString()}>{message.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;


