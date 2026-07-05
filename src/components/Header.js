"use client";

/**
 * Header — Top bar of the chat area showing current persona info,
 * mobile menu toggle, and action buttons.
 */
export default function Header({
  persona,
  onToggleSidebar,
  onClearChat,
  hasMessages,
}) {
  return (
    <header className="chat-header" id="chat-header">
      <div className="chat-header-persona">
        <button
          className="chat-header-btn mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar menu"
          id="mobile-menu-toggle"
        >
          ☰
        </button>
        <img
          src={persona.avatar}
          alt={persona.name}
          className="chat-header-avatar"
          width={36}
          height={36}
        />
        <div className="chat-header-info">
          <div className="chat-header-name">{persona.name}</div>
          <div className="chat-header-status">Online</div>
        </div>
      </div>
      <div className="chat-header-actions">
        {hasMessages && (
          <button
            className="chat-header-btn"
            onClick={onClearChat}
            aria-label="Clear conversation"
            title="Clear conversation"
            id="clear-chat-btn"
          >
            🗑
          </button>
        )}
      </div>
    </header>
  );
}
