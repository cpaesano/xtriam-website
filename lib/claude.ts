import Anthropic from "@anthropic-ai/sdk";
import type { ChatMessage } from "@/types/auth";
import { getRelevantKnowledge } from "./knowledge-loader";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Base system prompt for bpmPro support
const BASE_SYSTEM_PROMPT = `You are a helpful customer support assistant for bpmPro, a Salesforce-native CRM solution for window and door contractors, developed by xTriam.

Support Contact Info:
- Phone: (305) 204-9694 (Mon-Fri, 8 AM - 6 PM EST)
- Email: support@xtriam.com

Formatting Guidelines:
- Use **bold** for important terms, step headers, and emphasis
- Use numbered lists for step-by-step instructions
- Use bullet points for feature lists
- Keep responses CONCISE - avoid unnecessary lengthy explanations
- When documentation includes a "Full Tutorial" link, ALWAYS include it at the end of your response

Your Guidelines:
- Be helpful, professional, and CONCISE
- When you have documentation, give clear step-by-step guidance
- When you do NOT have documentation for something, keep it brief:
  "I don't have details on [topic] in my reference materials. Please contact support at (305) 204-9694 or support@xtriam.com for help with this."
- Do NOT write long explanations when redirecting to support
- Never ask for passwords or payment details
- If unsure, be honest and redirect to support briefly`;

/**
 * Build dynamic system prompt with relevant knowledge context
 */
function buildSystemPrompt(userMessage: string): string {
  const relevantKnowledge = getRelevantKnowledge(userMessage);

  if (!relevantKnowledge) {
    return BASE_SYSTEM_PROMPT;
  }

  return `${BASE_SYSTEM_PROMPT}

---

DOCUMENTATION FOR THIS QUESTION:

${relevantKnowledge}

---

Use this documentation to answer. Keep responses concise and well-formatted.`;
}

/**
 * Send messages to Claude and get a response
 * Uses dynamic context injection based on user's question
 */
export async function chat(messages: ChatMessage[]): Promise<string> {
  try {
    // Get the last user message to determine relevant context
    const lastUserMessage = messages
      .filter((m) => m.role === "user")
      .pop();

    // Build system prompt with relevant knowledge
    const systemPrompt = lastUserMessage
      ? buildSystemPrompt(lastUserMessage.content)
      : BASE_SYSTEM_PROMPT;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    // Extract text from response
    if (response.content[0].type === "text") {
      return response.content[0].text;
    }

    return "I apologize, but I was unable to generate a response. Please try again.";
  } catch (error) {
    console.error("Claude API error:", error);
    throw new Error("Failed to get AI response");
  }
}

/**
 * Get a welcome message for new chat sessions
 */
export function getWelcomeMessage(): string {
  return `Hello! I'm your bpmPro support assistant. I can help with questions about features, how-to guides, and troubleshooting.

What can I help you with today?`;
}
