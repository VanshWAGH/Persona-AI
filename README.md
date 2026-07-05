# 🎭 Persona AI — Chat with Hitesh Choudhary & Piyush Garg

An AI-powered chat application that supports multiple LLM backends (OpenAI's GPT-4o-mini and Google's Gemini 2.5 Flash) to simulate authentic conversations with two of India's most influential coding educators: **Hitesh Choudhary** and **Piyush Garg**.

> Built as a project for the **GenAI Cohort** by ChaiCode.

---

## ✨ Features

- 🤖 **Dual Persona System** — Switch between Hitesh Choudhary and Piyush Garg
- ⚙️ **Dual Model Provider** — Instantly toggle between OpenAI (GPT-4o-mini) and Google (Gemini 2.5 Flash) backends
- 🎨 **Dynamic Theming** — Colors, gradients, and accents change with each persona
- ⚡ **Streaming Responses** — Real-time typing effect via Server-Sent Events (SSE)
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- 🌙 **Premium Dark Mode** — Glassmorphism UI with animated gradient backgrounds
- 💬 **Context-Aware** — Maintains conversation context with sliding window management
- 🔒 **Secure** — API keys stay server-side, never exposed to the client

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 (App Router) | Full-stack React framework |
| OpenAI GPT-4o-mini | LLM for persona-based responses |
| Gemini 2.5 Flash | Alternative LLM for responses |
| Vanilla CSS | Premium custom design system |
| Server-Sent Events | Real-time streaming |
| Google Fonts (Inter + JetBrains Mono) | Typography |

## 📋 Prerequisites

- **Node.js** 18+ installed
- **npm** package manager
- **OpenAI API Key** (optional if using Gemini) — Get one at [platform.openai.com](https://platform.openai.com)
- **Google Gemini API Key** (optional if using OpenAI) — Get one at [aistudio.google.com](https://aistudio.google.com)

## 🚀 Setup & Run Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/persona-ai.git
cd persona-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
persona-ai/
├── .env.local                    # API keys (git-ignored)
├── src/
│   ├── app/
│   │   ├── layout.js             # Root layout with fonts & SEO
│   │   ├── page.js               # Main chat page
│   │   ├── globals.css           # Complete design system
│   │   └── api/chat/route.js     # Streaming OpenAI & Gemini API endpoint
│   ├── components/
│   │   ├── ChatWindow.js         # Main orchestrator component
│   │   ├── MessageList.js        # Scrollable message display
│   │   ├── MessageBubble.js      # Individual message with markdown
│   │   ├── ChatInput.js          # Text input with auto-resize
│   │   ├── PersonaSwitcher.js    # Persona selection sidebar & API toggle
│   │   └── Header.js             # Chat header with persona info
│   ├── hooks/
│   │   └── useChat.js            # Chat state & streaming hook
│   └── lib/
│       ├── personas.js           # Persona definitions & prompts
│       ├── openai.js             # OpenAI client configuration
│       └── gemini.js             # Gemini client configuration
├── public/images/                # Persona avatars
├── DOCUMENTATION.md              # Technical documentation
└── README.md                     # This file
```

## 📖 Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed information on:
- How persona data was collected and prepared
- Prompt engineering strategy
- Context management approach
- Sample conversations demonstrating both personas

## 📝 License

This project is built for educational purposes as part of the GenAI Cohort.
