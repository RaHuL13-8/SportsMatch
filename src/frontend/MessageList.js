import React from "react";
import { useAuthValue } from "../context.js";
import { useMessages } from "./useMessages.js";
import "../index.css";

function Message({ message, isOwnMessage }) {
  const { displayName, text } = message;
  return (
    <li className={["message", isOwnMessage && "own-message"].join(" ")}>
      <h4 className="sender">{isOwnMessage ? "You" : displayName}</h4>
      <div>{text}</div>
    </li>
  );
}

function MessageList({ roomId, user }) {
  const containerRef = React.useRef(null);
  const messages = useMessages(roomId);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list">
        {messages.map((x) => (
          <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
        ))}
      </ul>
    </div>
  );
}

export { MessageList };
