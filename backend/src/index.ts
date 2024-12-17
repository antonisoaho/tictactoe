import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const rooms: { [key: string]: string[] } = {};

// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
//       if (err) return next(new Error("Authentication error"));
//       socket.data.userId = (decoded as any).userId;
//       next();
//     });
//   } else {
//     next(new Error("Authentication error"));
//   }
// });

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", ({ room, username }) => {
    if (!rooms[room]) {
      rooms[room] = [];
    }

    if (rooms[room].length < 2) {
      rooms[room].push(username);
      socket.join(room);
      socket.to(room).emit("user_joined", `${username} has joined`);
    } else {
      socket.emit("room_full", "Room is full");
    }
  });

  socket.on("message", ({ room, message, sender }) => {
    socket.to(room).emit("message", { sender, message });
  });

  socket.on("move", ({ room, move }) => {
    socket.to(room).emit("move", move);
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      rooms[room] = rooms[room].filter((user) => user !== socket.id);
      if (rooms[room].length === 0) {
        delete rooms[room];
      }
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = parseInt(process.env.PORT || "5000", 10);
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
