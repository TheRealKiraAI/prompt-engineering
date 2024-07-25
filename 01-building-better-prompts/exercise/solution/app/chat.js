"use client";

import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
      {messages.map((m, index) => (
        <div key={index}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          style={{
            padding: "5px",
            borderRadius: "3px",
            border: "1px solid #aaa",
            width: "100%",
          }}
        />
      </form>
    </div>
  );
}
