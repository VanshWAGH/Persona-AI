"use client";

/**
 * PersonaSwitcher — Sidebar component that displays persona cards
 * and allows switching between Hitesh and Piyush.
 */
export default function PersonaSwitcher({
  personas,
  activePersona,
  onSelect,
  provider,
  onProviderChange,
}) {
  return (
    <>
      <div className="sidebar-section-title">Choose Persona</div>
      <div className="persona-list">
        {Object.values(personas).map((persona) => (
          <button
            key={persona.id}
            type="button"
            id={`persona-card-${persona.id}`}
            className={`persona-card ${
              activePersona === persona.id ? "active" : ""
            }`}
            onClick={() => onSelect(persona.id)}
            aria-label={`Chat with ${persona.name}`}
            aria-pressed={activePersona === persona.id}
          >
            <img
              src={persona.avatar}
              alt={persona.name}
              className="persona-avatar"
              width={44}
              height={44}
            />
            <div className="persona-info">
              <div className="persona-name">{persona.name}</div>
              <div className="persona-tagline">{persona.tagline}</div>
            </div>
            <div className="persona-indicator" />
          </button>
        ))}
      </div>
      <div className="sidebar-section-title" style={{ marginTop: "16px" }}>AI Provider</div>
      <div className="provider-select-wrapper" style={{ padding: "0 12px" }}>
        <select
          className="provider-select"
          value={provider}
          onChange={(e) => onProviderChange(e.target.value)}
          aria-label="Select AI Provider"
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border-default)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            outline: "none",
            cursor: "pointer"
          }}
        >
          <option value="openai">OpenAI (GPT-4o-mini)</option>
          <option value="gemini">Google (Gemini 2.5 Flash)</option>
        </select>
      </div>
    </>
  );
}
