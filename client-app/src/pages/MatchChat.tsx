import { useEffect, useState } from 'react';
import { fetchMessages } from '../lib/api'; // ודא שזה הנתיב הנכון
const token = "TOKEN שלך כאן"; // החלף בטוקן זמני לבדיקות

export default function MatchChat() {
  const matchId = 1; // תוכל לשנות לפי הצורך
  const [messages, setMessages] = useState<{ id: number; content: string; sender_id: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages(matchId, token)
      .then(data => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching messages:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">התכתבות</h2>

      {loading ? (
        <p>טוען הודעות...</p>
      ) : (
        <ul className="space-y-2">
          {messages.map(msg => (
            <li key={msg.id} className="bg-gray-100 rounded p-2">
              <span className="text-sm text-gray-600">#{msg.sender_id}:</span> {msg.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 