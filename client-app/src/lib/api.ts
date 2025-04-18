export async function fetchMessages(matchId: number, token: string) {
  const res = await fetch(`http://localhost:3000/api/v1/messages/${matchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}

export async function sendMessage(matchId: number, content: string, token: string) {
  const res = await fetch(`http://localhost:3000/api/v1/messages/${matchId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export async function fetchActiveMatch(token: string) {
  const res = await fetch("http://localhost:3000/api/v1/match/active", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
} 