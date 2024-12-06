import React, { useState } from 'react';

interface ChatBotProps {
  onClose: () => void;
}

interface Message {
  user: boolean;
  text: string;
}

export const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [interactionCount, setInteractionCount] = useState(0);

  const handleSend = () => {
    if (interactionCount >= 5) {
      setMessages([...messages, { user: false, text: "Unlock full access to BoostAI by signing up!" }]);
      return;
    }

    const userMessage = { user: true, text: input };
    const botMessage = { user: false, text: "Remember, even small steps forward are victories. Take a moment to stretch and hydrate!"};

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
    setInteractionCount(interactionCount + 1);
  };

  return (
    <div className="fixed bottom-20 right-8 bg-white p-4 rounded-lg shadow-lg w-80">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold">BoostAI Chat</h4>
        <button onClick={onClose} className="text-red-500">Close</button>
      </div>
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.user ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.user ? 'bg-purple-100' : 'bg-purple-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button onClick={handleSend} className="ml-2 bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors">
          Send
        </button>
      </div>
    </div>
  );
}; 