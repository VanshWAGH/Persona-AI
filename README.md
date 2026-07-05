# 🎭 Persona AI — Chat with Hitesh Choudhary & Piyush Garg

An AI-powered chat application that uses OpenAI's GPT-4o-mini to simulate authentic conversations with two of India's most influential coding educators: **Hitesh Choudhary** and **Piyush Garg**.

> Built as a project for the **GenAI Cohort** by ChaiCode.

---

## ✨ Features

- 🤖 **Dual Persona System** — Switch between Hitesh Choudhary and Piyush Garg
- 🎨 **Dynamic Theming** — Colors, gradients, and accents change with each persona
- ⚡ **Streaming Responses** — Real-time typing effect via Server-Sent Events (SSE)
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- 🌙 **Premium Dark Mode** — Glassmorphism UI with animated gradient backgrounds
- 💬 **Context-Aware** — Maintains conversation context with sliding window management
- 🔒 **Secure** — API key stays server-side, never exposed to the client

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 (App Router) | Full-stack React framework |
| OpenAI GPT-4o-mini | LLM for persona-based responses |
| Vanilla CSS | Premium custom design system |
| Server-Sent Events | Real-time streaming |
| Google Fonts (Inter + JetBrains Mono) | Typography |

## 📋 Prerequisites

- **Node.js** 18+ installed
- **npm** package manager
- **OpenAI API Key** — Get one at [platform.openai.com](https://platform.openai.com)

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
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment (Vercel)

The easiest way to deploy is via [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository on Vercel
3. Add `OPENAI_API_KEY` as an environment variable in Vercel's dashboard
4. Deploy!

## 📁 Project Structure

```
persona-ai/
├── .env.local                    # OpenAI API key (git-ignored)
├── src/
│   ├── app/
│   │   ├── layout.js             # Root layout with fonts & SEO
│   │   ├── page.js               # Main chat page
│   │   ├── globals.css           # Complete design system
│   │   └── api/chat/route.js     # Streaming OpenAI API endpoint
│   ├── components/
│   │   ├── ChatWindow.js         # Main orchestrator component
│   │   ├── MessageList.js        # Scrollable message display
│   │   ├── MessageBubble.js      # Individual message with markdown
│   │   ├── ChatInput.js          # Text input with auto-resize
│   │   ├── PersonaSwitcher.js    # Persona selection sidebar
│   │   ├── Header.js             # Chat header with persona info
│   │   └── WelcomeScreen.js      # Landing screen with starters
│   ├── hooks/
│   │   └── useChat.js            # Chat state & streaming hook
│   └── lib/
│       ├── personas.js           # Persona definitions & prompts
│       └── openai.js             # OpenAI client configuration
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
