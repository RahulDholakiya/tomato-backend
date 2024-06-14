import { WebSocketServer, WebSocket } from "ws";
import chatModel from "../models/chatModel.js";

const setupWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data);
        await saveMessageToDB(message);
        // message to all clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            const broadcastMessage = {
              user: message.user,
              message: message.message,
              image: message.image
                ? `http://localhost:4000/images/${message.image}`
                : null,
            };
            client.send(JSON.stringify(broadcastMessage));
          }
        });
      } catch (error) {
        console.error("Failed to parse message as JSON:", error);
      }
    });
  });

  return wss;
};

async function saveMessageToDB(message) {
  try {
    const savedMessage = await chatModel.create({
      user: message.user,
      message: message.message,
      image: message.image || null,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error saving message to database:", error);
  }
}

export { setupWebSocketServer };
