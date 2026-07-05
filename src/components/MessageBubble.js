"use client";

/**
 * MessageBubble — Renders a single chat message with proper formatting.
 * Handles both user and assistant messages with markdown-like rendering.
 */
export default function MessageBubble({ message, personaAvatar }) {
  const isUser = message.role === "user";

  /**
   * Simple markdown-to-HTML renderer
   * Handles: bold, italic, code blocks, inline code, lists, headings, blockquotes, line breaks
   */
  function renderMarkdown(text) {
    if (!text) return "";

    let html = text;

    // Escape HTML first
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Code blocks (``` ... ```)
    html = html.replace(
      /```(\w*)\n?([\s\S]*?)```/g,
      (_, lang, code) =>
        `<pre><code class="language-${lang || "text"}">${code.trim()}</code></pre>`
    );

    // Inline code (` ... `)
    html = html.replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    );

    // Bold (**text** or __text__)
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Italic (*text* or _text_)
    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
    html = html.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<em>$1</em>");

    // Headings
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

    // Blockquotes
    html = html.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");

    // Unordered lists
    html = html.replace(/^[\-\*] (.+)$/gm, "<li>$1</li>");
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

    // Line breaks (double newline = paragraph)
    html = html.replace(/\n\n/g, "</p><p>");
    html = html.replace(/\n/g, "<br/>");

    // Wrap in paragraph
    if (!html.startsWith("<")) {
      html = `<p>${html}</p>`;
    }

    return html;
  }

  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`message-row ${isUser ? "user" : "assistant"}`}
      id={`message-${message.id}`}
    >
      <div className="message-avatar-col">
        {isUser ? (
          <div className="message-user-icon" aria-hidden="true">
            👤
          </div>
        ) : (
          <img
            src={personaAvatar}
            alt="AI"
            className="message-avatar"
            width={32}
            height={32}
          />
        )}
      </div>
      <div className="message-content-col">
        <div
          className="message-bubble"
          dangerouslySetInnerHTML={{
            __html: isUser
              ? `<p>${message.content.replace(/\n/g, "<br/>")}</p>`
              : renderMarkdown(message.content),
          }}
        />
        <div className="message-time">{time}</div>
      </div>
    </div>
  );
}
