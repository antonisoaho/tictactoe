"use client";
import React, { useMemo, useState } from "react";
import { io } from "socket.io-client";

const page = () => {
  const socket = useMemo(() => io("http://localhost:5000"), []);
  const [connected, setConnected] = useState<boolean>(false);
  socket.on("connect", () => {
    console.log(`I am connected`);
    setConnected(true);
  });
  return <div>{connected ? "Ansluten" : "inte ansluten"}</div>;
};

export default page;
