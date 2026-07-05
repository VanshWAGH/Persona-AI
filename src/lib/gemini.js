import { GoogleGenAI } from "@google/genai";

/**
 * Singleton Gemini client instance
 * Uses the API key from environment variables (server-side only)
 */
const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default gemini;

/**
 * Default model configuration for Gemini
 */
export const GEMINI_MODEL_CONFIG = {
  model: "gemini-2.5-flash",
  config: {
    temperature: 0.8, // Slightly creative for persona authenticity
    maxOutputTokens: 1024,
    topP: 0.95,
  }
};
