import { getPersona } from "@/lib/personas";
import openai, { MODEL_CONFIG, MAX_CONTEXT_MESSAGES } from "@/lib/openai";
import gemini, { GEMINI_MODEL_CONFIG } from "@/lib/gemini";

export const runtime = "nodejs";

/**
 * POST /api/chat
 *
 * Handles chat requests with persona-based system prompts.
 * Streams the response back as SSE for real-time display.
 *
 * Body: { persona: string, provider: string, messages: Array<{role, content}> }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { persona: personaId, provider = "openai", messages } = body;

    // Validate inputs
    if (!personaId || !messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Missing required fields: persona, messages" },
        { status: 400 }
      );
    }

    // Get persona configuration
    const persona = getPersona(personaId);

    // Context management: sliding window of last N messages
    const contextMessages = messages.slice(-MAX_CONTEXT_MESSAGES);

    const encoder = new TextEncoder();

    if (provider === "gemini") {
      // Check API key
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your-gemini-api-key-here") {
        return Response.json(
          { error: "Gemini API key not configured. Please add your key to .env.local" },
          { status: 500 }
        );
      }

      // Convert messages to Gemini format (user vs model)
      const geminiContents = [
        // System instructions are passed separately in the config for Gemini
      ];
      
      for (const msg of contextMessages) {
        geminiContents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }

      const stream = await gemini.models.generateContentStream({
        model: GEMINI_MODEL_CONFIG.model,
        contents: geminiContents,
        config: {
          ...GEMINI_MODEL_CONFIG.config,
          systemInstruction: persona.systemPrompt,
        }
      });

      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const content = chunk.text;
              if (content) {
                const data = JSON.stringify({ content });
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              }
            }
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          } catch (error) {
            const errData = JSON.stringify({ error: error.message });
            controller.enqueue(encoder.encode(`data: ${errData}\n\n`));
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });

    } else {
      // OpenAI Fallback
      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-your-openai-api-key-here" || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
        return Response.json(
          { error: "OpenAI API key not configured. Please add your key to .env.local" },
          { status: 500 }
        );
      }

      // Construct the full messages array with system prompt
      const fullMessages = [
        { role: "system", content: persona.systemPrompt },
        ...contextMessages,
      ];

      // Create streaming completion
      const stream = await openai.chat.completions.create({
        ...MODEL_CONFIG,
        messages: fullMessages,
        stream: true,
      });

      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                const data = JSON.stringify({ content });
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              }
              if (chunk.choices[0]?.finish_reason === "stop") {
                controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
              }
            }
          } catch (error) {
            const errData = JSON.stringify({ error: error.message });
            controller.enqueue(encoder.encode(`data: ${errData}\n\n`));
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }
  } catch (error) {
    console.error("Chat API Error:", error);

    if (error?.status === 401) {
      return Response.json(
        { error: "Invalid API key. Please check your .env.local file." },
        { status: 401 }
      );
    }

    if (error?.status === 429) {
      return Response.json(
        { error: "Rate limit exceeded. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
