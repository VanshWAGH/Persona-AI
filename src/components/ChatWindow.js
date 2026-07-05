"use client";

import { useState, useCallback } from "react";
import { PERSONAS } from "@/lib/personas";
import { useChat } from "@/hooks/useChat";
import PersonaSwitcher from "./PersonaSwitcher";
import Header from "./Header";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";

/**
 * ChatWindow — Main orchestrator component.
 * Manages persona selection, sidebar state, and connects all sub-components.
 */
export default function ChatWindow() {
  const [activePersona, setActivePersona] = useState("hitesh");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [provider, setProvider] = useState("openai");

  const persona = PERSONAS[activePersona] || PERSONAS["hitesh"];
  const { messages, isLoading, error, sendMessage, clearMessages, dismissError } =
    useChat(activePersona, provider);

  /**
   * Switch persona and clear conversation
   */
  const handlePersonaSwitch = useCallback(
    (personaId) => {
      console.log("handlePersonaSwitch called with:", personaId);
      if (personaId === activePersona) return;
      setActivePersona(personaId);
      clearMessages();
      setSidebarOpen(false);
    },
    [activePersona, clearMessages]
  );

  /**
   * Start a new chat (clear messages)
   */
  const handleNewChat = useCallback(() => {
    clearMessages();
    setSidebarOpen(false);
  }, [clearMessages]);

  /**
   * Send a message (from input or starter chip)
   */
  const handleSend = useCallback(
    (content) => {
      sendMessage(content);
    },
    [sendMessage]
  );

  const hasMessages = messages.length > 0;

  return (
    <div className="app-layout" data-persona={activePersona}>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        id="sidebar"
        role="complementary"
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">P</div>
            <span className="sidebar-logo-text">Persona AI</span>
            <span className="sidebar-logo-badge">v1.0</span>
          </div>
        </div>

        <PersonaSwitcher
          personas={PERSONAS}
          activePersona={activePersona}
          onSelect={handlePersonaSwitch}
          provider={provider}
          onProviderChange={setProvider}
        />

        <div className="sidebar-footer">
          <p className="sidebar-footer-text">
            Powered by {provider === "openai" ? "OpenAI GPT-4o-mini" : "Gemini 2.5 Flash"}
            <br />
            Built for{" "}
            <a
              href="https://chaicode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-footer-link"
            >
              GenAI Cohort
            </a>
          </p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main" id="chat-main">
        <Header
          persona={persona}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onClearChat={clearMessages}
          hasMessages={hasMessages}
        />

        {/* Error banner */}
        {error && (
          <div className="chat-messages-inner">
            <div className="error-banner" role="alert">
              <span className="error-banner-icon">⚠</span>
              <span>{error}</span>
              <button
                className="error-banner-dismiss"
                onClick={dismissError}
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Messages or Welcome */}
        {hasMessages ? (
          <MessageList
            messages={messages}
            personaAvatar={persona.avatar}
            isLoading={isLoading}
          />
        ) : (
          <WelcomeScreen
            persona={persona}
            onStarterClick={handleSend}
          />
        )}

        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          personaName={persona.name}
        />
      </main>
    </div>
  );
}
