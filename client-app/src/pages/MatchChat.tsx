import { useEffect, useState } from 'react';
import { fetchMessages, sendMessage, fetchActiveMatch } from '../lib/api'; // ודא שזה הנתיב הנכון

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE3NDQ4MzU2OTUsImV4cCI6MTc0NTQ0MDQ5NX0.9qcoGVbo_azfESRc5uYyL4-8iI17x5xhVFWPbmHrAYU';

export default function MatchChat() {
  const [match, setMatch] = useState<any>(null);
  const [messages, setMessages] = useState<{ id: number; content: string; sender_id: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchActiveMatch(token)
      .then((data) => {
        setMatch(data.match);
        if (data.match && data.match.id) {
          loadMessages(data.match.id);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch active match", err);
        setLoading(false);
      });
  }, []);

  const loadMessages = (matchId: number) => {
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!match || !match.id || !messageInput.trim() || sending) return;
    
    try {
      setSending(true);
      await sendMessage(match.id, messageInput, token);
      setMessageInput("");
      // Reload messages to show the new one
      loadMessages(match.id);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {match ? (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">התאמה פעילה</h2>
          <div className="text-sm">
            <p>מזהה התאמה: {match.id}</p>
            {match.other_user && (
              <p>משתמש: {match.other_user.name}</p>
            )}
            <p>התחילה ב־{new Date(match.started_at).toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
          <p className="text-center">אין התאמה פעילה</p>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">התכתבות</h2>

      {loading ? (
        <p>טוען הודעות...</p>
      ) : (
        <div className="space-y-4">
          {messages.length > 0 ? (
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {messages.map(msg => (
                <li key={msg.id} className="bg-gray-100 rounded p-2">
                  <span className="text-sm text-gray-600">#{msg.sender_id}:</span> {msg.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">אין הודעות עדיין</p>
          )}
          
          {match && (
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
          )}
        </div>
      )}
    </div>
  );
} 