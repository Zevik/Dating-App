import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Match = {
  id: number;
  started_at: string;
  other_user: {
    id: number;
    name: string;
    avatar_url: string;
  };
};

export default function ActiveMatch() {
  const [match, setMatch] = useState<Match | null>(null);
  const [timePassed, setTimePassed] = useState<string>("");

  const apiFetch = async (url: string, opts: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      ...opts,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(opts.headers || {}),
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  useEffect(() => {
    apiFetch("/api/v1/match/active")
      .then((res) => setMatch(res.match))
      .catch(() => toast.error("Failed to load match"));
  }, []);

  useEffect(() => {
    if (!match) return;

    const interval = setInterval(() => {
      const start = new Date(match.started_at).getTime();
      const now = Date.now();
      const diff = Math.floor((now - start) / 1000);
      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;
      setTimePassed(`${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [match]);

  const endMatch = async () => {
    if (!match) return;
    const confirmed = confirm("Are you sure you want to end this match?");
    if (!confirmed) return;

    try {
      await apiFetch(`/api/v1/match/${match.id}`, { method: "DELETE" });
      toast.success("Match ended");
      setMatch(null);
    } catch {
      toast.error("Failed to end match");
    }
  };

  if (!match) return <p className="p-6 text-center">No active match</p>;

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Your Match</h2>
      <img
        src={match.other_user.avatar_url}
        alt={match.other_user.name}
        className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
      />
      <h3 className="text-xl font-medium">{match.other_user.name}</h3>
      <p className="text-sm text-slate-500 mt-1">Matched {timePassed} ago</p>
      <button
        onClick={endMatch}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        End Match
      </button>
      <button
        onClick={() => toast("🔜 Call feature coming soon")}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start Call
      </button>
    </div>
  );
} 