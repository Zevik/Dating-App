import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const MatchChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const matchId = 1; // In a real app, this would come from props or context

  useEffect(() => {
    // Connect to WebSocket server
    wsRef.current = new WebSocket(`ws://localhost:3000?matchId=${matchId}`);

    // Handle connection open
    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
      setError(null);
    };

    // Handle incoming messages
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(), 
          sender: data.sender || 'Partner',
          content: data.content,
          timestamp: data.timestamp || new Date().toISOString()
        }]);
      } catch (e) {
        console.error('Error parsing message:', e);
      }
    };

    // Handle errors
    wsRef.current.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('Connection error. Please try again later.');
      setConnected(false);
    };

    // Handle connection close
    wsRef.current.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    // Clean up on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [matchId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !connected || !wsRef.current) return;

    // Create message object
    const message = {
      content: messageInput,
      sender: 'Me', // In a real app, this would be the user's name
      timestamp: new Date().toISOString()
    };

    // Send message through WebSocket
    wsRef.current.send(JSON.stringify(message));

    // Add message to local state
    setMessages(prev => [...prev, { ...message, id: crypto.randomUUID() }]);
    
    // Clear input
    setMessageInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Match Chat</h1>
        <div className="text-sm">
          {connected ? 
            <span className="flex items-center">
              <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span> Connected
            </span> : 
            <span className="flex items-center">
              <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span> Disconnected
            </span>
          }
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-2 rounded">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map(message => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'Me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                message.sender === 'Me' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                <div className="font-semibold">{message.sender}</div>
                <div>{message.content}</div>
                <div className="text-xs opacity-75 text-right">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="border-t border-gray-300 p-4 bg-white">
        <div className="flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!connected}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={!connected || !messageInput.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MatchChat; 