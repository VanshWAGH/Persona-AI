"use client";

import { useState, useRef, useEffect } from "react";

/**
 * ChatInput — Text input area with send button.
 * Supports Enter to send, Shift+Enter for new line,
 * and auto-resizing textarea.
 */
export default function ChatInput({ onSend, isLoading, personaName }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue("");
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div className="chat-input-box">
          <textarea
            ref={textareaRef}
            className="chat-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${personaName} anything...`}
            disabled={isLoading}
            rows={1}
            id="chat-input-field"
            aria-label="Type your message"
          />
          <button
            className="chat-send-btn"
            onClick={handleSubmit}
            disabled={!value.trim() || isLoading}
            aria-label="Send message"
            id="chat-send-btn"
          >
            ➤
          </button>
        </div>
        <div className="chat-input-hint">
          Press Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
