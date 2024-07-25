"use client";

import { useChat } from "@ai-sdk/react";

export default function Chat() {
  // useChat hook defaults to our POST API route in api/chat
  // useChat hook provides functions and state for handling user input and the form submission
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    // maps over the messages array and renders each message with a role and content
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
