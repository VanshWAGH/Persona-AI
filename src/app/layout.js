import "./globals.css";

export const metadata = {
  title: "Persona AI — Chat with Hitesh Choudhary & Piyush Garg",
  description:
    "AI-powered chat simulator that recreates conversations with India's top coding educators. Switch between Hitesh Choudhary and Piyush Garg personas for personalized tech mentorship.",
  keywords: [
    "Persona AI",
    "Hitesh Choudhary",
    "Piyush Garg",
    "AI Chat",
    "Coding Educator",
    "GenAI",
    "LLM",
    "ChaiCode",
  ],
  authors: [{ name: "GenAI Cohort Project" }],
  openGraph: {
    title: "Persona AI — Chat with Hitesh & Piyush",
    description:
      "AI-powered chat that simulates conversations with India's top coding educators.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
