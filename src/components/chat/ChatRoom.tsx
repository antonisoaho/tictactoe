"use client";

import ChatForm from "@/components/chat/ChatForm";
import ChatMessage from "@/components/chat/ChatMessage";
import socket from "@/lib/socket";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
// import { socket } from "@/lib/socketClient";

const ChatRoom = () => {
  const [room, setRoom] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected`);
    });

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (message) => {
      setMessages((prev) => [...prev, { sender: "system", message }]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: username };
    setMessages((prev) => [...prev, { sender: username, message }]);

    socket.emit("message", data);
  };

  const handleJoinRoom = () => {
    if (room.trim() !== "" || username.trim() !== "") {
      socket.emit("join-room", { room, username });
      setJoined(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!joined ? (
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">Join a room</h1>
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 rounded-lg border-2 border-gray-200"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            className="px-4 py-2 rounded-lg border-2 border-gray-200"
            onChange={(e) => setRoom(e.target.value)}
          />

          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-bold">Room: {room}</h1>
          <div className="bg-gray-200 h-[500px] overflow-y-auto p-4 mb-4 rounded-lg border-2 border-gray-200">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                isOwnMessage={msg.sender == username}
                {...msg}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
