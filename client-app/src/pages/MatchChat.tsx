import { useEffect, useState } from 'react';
import { fetchMessages, sendMessage } from '../lib/api'; // ודא שזה הנתיב הנכון
const token = "TOKEN שלך כאן"; // החלף בטוקן זמני לבדיקות

export default function MatchChat() {
  const matchId = 1; // תוכל לשנות לפי הצורך
  const [messages, setMessages] = useState<{ id: number; content: string; sender_id: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);

  const loadMessages = () => {
    fetchMessages(matchId, token)
      .then(data => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching messages:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim() || sending) return;
    
    try {
      setSending(true);
      await sendMessage(matchId, messageInput, token);
      setMessageInput("");
      // Reload messages to show the new one
      loadMessages();
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">התכתבות</h2>

      {loading ? (
        <p>טוען הודעות...</p>
      ) : (
        <div className="space-y-4">
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {messages.map(msg => (
              <li key={msg.id} className="bg-gray-100 rounded p-2">
                <span className="text-sm text-gray-600">#{msg.sender_id}:</span> {msg.content}
              </li>
            ))}
          </ul>
          
          <form onSubmit={handleSendMessage} className="mt-4">
            <div className="flex">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="הקלד הודעה..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={sending}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                disabled={sending || !messageInput.trim()}
              >
                {sending ? "שולח..." : "שלח"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 