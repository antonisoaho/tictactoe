// const express = require("express");
// import { Server } from "socket.io";
// import { createServer } from "http";
// const server = createServer();

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("join-room", ({ room, username }) => {
//     socket.join(room);
//     console.log(`User ${username} joined room: ${room}`);
//     socket.to(room).emit("user_joined", `${username} has joined`);
//   });

//   socket.on("message", ({ room, message, sender }) => {
//     console.log(`Message from ${sender} in room ${room}: ${message}`);
//     socket.to(room).emit("message", { sender, message });
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// server.listen(5000, () => {
//   console.log("Server running on http://localhost:4000");
// });

import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", ({ room, username }) => {
    socket.join(room);
    socket.to(room).emit("user_joined", `${username} has joined`);
  });

  socket.on("message", ({ room, message, sender }) => {
    socket.to(room).emit("message", { sender, message });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

console.log("port", process.env.PORT);
const PORT = parseInt(process.env.PORT || "5000", 10);

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
