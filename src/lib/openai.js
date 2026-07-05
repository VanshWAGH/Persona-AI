import OpenAI from "openai";

/**
 * Singleton OpenAI client instance
 * Uses the API key from environment variables (server-side only)
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;

/**
 * Default model configuration
 */
export const MODEL_CONFIG = {
  model: "gpt-4o-mini",
  temperature: 0.8, // Slightly creative for persona authenticity
  max_tokens: 1024,
  top_p: 0.95,
  frequency_penalty: 0.3, // Reduce repetitive phrases
  presence_penalty: 0.3,  // Encourage diverse vocabulary
};

/**
 * Maximum number of conversation messages to send for context
 * Keeps the sliding window manageable for token limits
 */
export const MAX_CONTEXT_MESSAGES = 20;
