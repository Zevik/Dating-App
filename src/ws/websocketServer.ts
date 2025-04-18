import { Server } from "ws";
import http from "http";

let wss: Server;

export function initWebSocket(server: http.Server) {
  wss = new Server({ server });

  wss.on("connection", (ws, req) => {
    console.log("📡 New WebSocket connection");

    // שמור matchId מהפרמטרים
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const matchId = url.searchParams.get("matchId");

    if (!matchId) {
      ws.close(1008, "Missing matchId");
      return;
    }

    // שמור matchId על החיבור
    (ws as any).matchId = matchId;

    ws.on("message", (data) => {
      // שדר את ההודעה לכל שאר המשתמשים באותו matchId
      wss.clients.forEach((client: any) => {
        if (client.readyState === 1 && client.matchId === matchId) {
          client.send(data.toString());
        }
      });
    });

    ws.on("close", () => {
      console.log("🔌 WebSocket disconnected");
    });
  });

  console.log("✅ WebSocket server initialized");
} 