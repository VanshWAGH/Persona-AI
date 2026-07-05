"use client";

/**
 * WelcomeScreen — Shown when there are no messages.
 * Displays persona info and conversation starter chips.
 */
export default function WelcomeScreen({ persona, onStarterClick }) {
  return (
    <div className="chat-messages" id="welcome-area">
      <div className="welcome-screen">
        <img
          src={persona.avatar}
          alt={persona.name}
          className="welcome-avatar"
          width={80}
          height={80}
        />
        <h1 className="welcome-title">Chat with {persona.name}</h1>
        <p className="welcome-subtitle">
          {persona.id === "hitesh"
            ? "Chai peelo friends! ☕ I'm here to help you with coding, career advice, and everything tech. Ask me anything!"
            : "Hey! I'm here to help you become a better developer. Ask me about Node.js, Docker, system design, or anything tech!"}
        </p>
        <div className="welcome-starters">
          {persona.conversationStarters.map((starter, i) => (
            <button
              key={i}
              className="welcome-starter"
              onClick={() => onStarterClick(starter)}
              id={`starter-${i}`}
            >
              {starter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
