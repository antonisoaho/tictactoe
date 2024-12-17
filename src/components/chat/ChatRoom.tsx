"use client";

import ChatForm from "@/components/chat/ChatForm";
import ChatMessage from "@/components/chat/ChatMessage";
import socket from "@/lib/socket";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const ChatRoom = () => {
  const [room, setRoom] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [roomFull, setRoomFull] = useState<boolean>(false);
  const [gameState, setGameState] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");

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

    socket.on("room_full", (message) => {
      setRoomFull(true);
    });

    socket.on("move", (move) => {
      setGameState((prev) => {
        const newState = [...prev];
        newState[move.index] = move.player;
        return newState;
      });
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
      socket.off("room_full");
      socket.off("move");
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

  const handleMove = (index: number) => {
    if (gameState[index] === "" && !roomFull) {
      const move = { index, player: currentPlayer };
      setGameState((prev) => {
        const newState = [...prev];
        newState[index] = currentPlayer;
        return newState;
      });
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
      socket.emit("move", { room, move });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!joined ? (
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">Join a room</h1>
          {roomFull && <p className="text-red-500">Room is full</p>}
          <input
            type="text"
            placeholder="Username"
            className="input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            className="input"
            onChange={(e) => setRoom(e.target.value)}
          />

          <button
            className="btn-primary"
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
          <div className="grid grid-cols-3 gap-2 mt-4">
            {gameState.map((cell, index) => (
              <div
                key={index}
                className="w-20 h-20 flex items-center justify-center border-2 border-gray-300"
                onClick={() => handleMove(index)}
              >
                {cell}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
