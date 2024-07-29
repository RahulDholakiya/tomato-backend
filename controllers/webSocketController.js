// import { WebSocketServer, WebSocket } from "ws";
// import chatModel from "../models/chatModel.js";
// import orderDetailsModel from "../models/orderDetailsModel.js";

// const setupWebSocketServer = (server) => {
//   const wss = new WebSocketServer({ server });

//   wss.on("connection", (ws) => {
//     ws.on("message", async (data) => {
//       try {
//         const message = JSON.parse(data);
//         if (message.type === "order") {
//           await saveOrderToDB(message);
//         } else {
//           await saveMessageToDB(message);
//         }

//         wss.clients.forEach((client) => {
//           if (client !== ws && client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(message));
//           }
//         });
//       } catch (error) {
//         console.error("Failed to parse message as JSON:", error);
//       }
//     });
//   });

//   return wss;
// };

// async function saveMessageToDB(message) {
//   if (!message.user || !message.message) {
//     console.error("Missing required fields: user or message");
//     return;
//   }

//   try {
//     await chatModel.create({
//       user: message.user,
//       message: message.message,
//       image: message.image || null,
//       timestamp: new Date(),
//     });
//   } catch (error) {
//     console.error("Error saving message to database:", error);
//   }
// }

// async function saveOrderToDB(message) {
//   try {
//     await orderDetailsModel.create({
//       orderId: message.orderId,
//       message: message.message,
//       image: message.image || null,
//       timestamp: message.timestamp ? new Date(message.timestamp) : new Date(),
//     });
//     console.log(orderId);
//   } catch (error) {
//     console.log("Error saving order to database", error);
//   }
// }

// export { setupWebSocketServer };

import { WebSocketServer, WebSocket } from "ws";
import chatModel from "../models/chatModel.js";
import orderDetailsModel from "../models/orderDetailsModel.js";

const setupWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data);
        if (message.type === "order") {
          await saveOrderToDB(message);
        } else {
          await saveMessageToDB(message);
        }

        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
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
  if (!message.user || !message.message) {
    console.error("Missing required fields: user or message");
    return;
  }

  try {
    await chatModel.create({
      user: message.user,
      message: message.message,
      image: message.image || null,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error saving message to database:", error);
  }
}

async function saveOrderToDB(message) {
  try {
    await orderDetailsModel.create({
      orderId: message.orderId,
      message: message.message,
      image: message.image || null,
      timestamp: message.timestamp ? new Date(message.timestamp) : new Date(),
    });
  } catch (error) {
    console.error("Error saving order to database", error);
  }
}

export { setupWebSocketServer };
