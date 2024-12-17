"use client";
import { io } from "socket.io-client";

// const token = localStorage.getItem("token");

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
  {
    transports: ["websocket"],
    // auth: {
    //   token: token ?? "mytoken",
    // },
  }
);

export default socket;
