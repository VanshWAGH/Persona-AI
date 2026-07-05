"use client";

import { useState, useCallback, useRef } from "react";

/**
 * Custom hook for managing chat state and streaming API communication.
 *
 * Handles:
 * - Message state management
 * - Streaming SSE responses from /api/chat
 * - Loading/error states
 * - Conversation clearing
 */
export function useChat(personaId, provider = "openai") {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  /**
   * Send a message and stream the response
   */
  const sendMessage = useCallback(
    async (content) => {
      if (!content.trim() || isLoading) return;

      setError(null);

      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);

      // Create placeholder for assistant response
      const assistantId = (Date.now() + 1).toString();
      const assistantMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Abort any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            persona: personaId,
            messages: updatedMessages.map(({ role, content }) => ({
              role,
              content,
            })),
            provider,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Server error: ${response.status}`
          );
        }

        // Read SSE stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.content) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: msg.content + parsed.content }
                      : msg
                  )
                );
              }
            } catch (parseErr) {
              if (parseErr.message && !parseErr.message.includes("JSON")) {
                throw parseErr;
              }
            }
          }
        }
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err.message);
        // Remove empty assistant message on error
        setMessages((prev) =>
          prev.filter(
            (msg) => !(msg.id === assistantId && msg.content === "")
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, personaId]
  );

  /**
   * Clear all messages
   */
  const clearMessages = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  /**
   * Dismiss error
   */
  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    dismissError,
  };
}
