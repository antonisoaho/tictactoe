"use client";

import React, { useState } from "react";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      className="flex gap-2 mt-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={message}
        placeholder="Type your message here..."
        className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-lg max-w-xs px-4 py-4 bg-blue-500 text-white hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
