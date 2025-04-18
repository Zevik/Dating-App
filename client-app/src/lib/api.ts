export async function fetchMessages(matchId: number, token: string) {
  const res = await fetch(`http://localhost:3000/api/v1/messages/${matchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
} 