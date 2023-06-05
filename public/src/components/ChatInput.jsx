import React, { useState } from "react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <form className="input-container" style={{ display: "flex" }} onSubmit={(event) => sendChat(event)}>
      <input
        style={{
          width: "90%",
          backgroundColor: "transparent",
          color: "black"
        }}
        type="text"
        placeholder="type your message here"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <button type="submit" style={{ padding: "0.3rem 2rem" }}>
        send
      </button>
    </form>
  );
}