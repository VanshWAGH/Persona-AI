"use client";

import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

/**
 * MessageList — Scrollable container for all chat messages.
 * Handles auto-scrolling to the latest message.
 */
export default function MessageList({ messages, personaAvatar, isLoading }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom on new messages or content updates
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div className="chat-messages" ref={containerRef} id="chat-messages">
      <div className="chat-messages-inner">
        {messages.map((message, index) => {
          const isLastEmptyAssistant = 
            isLoading && 
            index === messages.length - 1 && 
            message.role === "assistant" && 
            message.content === "";
            
          if (isLastEmptyAssistant) return null;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              personaAvatar={personaAvatar}
            />
          );
        })}

        {/* Typing indicator shown while loading */}
        {isLoading && messages[messages.length - 1]?.role === "assistant" && messages[messages.length - 1]?.content === "" && (
          <div className="typing-indicator">
            <div className="message-avatar-col">
              <img
                src={personaAvatar}
                alt="AI typing"
                className="message-avatar"
                width={32}
                height={32}
              />
            </div>
            <div className="typing-bubble">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
