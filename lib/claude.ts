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
- When documentation includes a tutorial URL, ALWAYS include it so users can view the full guide with screenshots or video
- When a video tutorial exists for a topic, mention that a video walkthrough is available
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

/**
 * Draft a customer-facing support reply for the admin "AI reply composer".
 * Follows xTriam support email conventions (plain text, no markdown, no em
 * dashes, no exclamation marks). Returns ONLY the reply body for the operator
 * to review and edit before sending. Different system prompt from chat() — this
 * writes an outbound support reply, it does not converse as the assistant.
 */
export async function draftSupportReply(input: {
  subject: string;
  description: string;
  customerName?: string;
  accountName?: string;
  thread?: { author: string; body: string }[];
  instruction: string;
}): Promise<string> {
  const system = `You draft customer-facing support reply messages for xTriam Support (bpmPro, a Salesforce-native CRM for window and door contractors).

Write in the xTriam support voice and follow these rules exactly:
- Plain text only. NO markdown syntax: no asterisks, no #, no bold. Use a hyphen or plain number only if a short list is genuinely needed.
- NO em dashes. Use commas, periods, or parentheses.
- NO exclamation marks. Deliver even good news calmly.
- No marketing language (no "excited", "thrilled", "seamless", "robust", "leverage").
- Be helpful, professional, calm, and concise. Match the customer's vocabulary.
- Open with "Dear <First Name>," when the customer's name is known.
- Do NOT invent facts, fixes, ticket numbers, dates, or commitments. Use only the ticket context and the operator's instruction. If information is missing, ask the customer for it clearly.
- If the operator pasted a rough draft, improve its clarity and tone while keeping their intent.
- Output ONLY the reply body. Do NOT include a subject line and do NOT add a signature block (it is added separately).`;

  const threadText =
    input.thread && input.thread.length
      ? input.thread.map((c) => `- ${c.author}: ${c.body}`).join("\n")
      : "(no prior replies)";

  const user = `TICKET SUBJECT: ${input.subject}
CUSTOMER: ${input.customerName || "Unknown"}${input.accountName ? ` (${input.accountName})` : ""}

CUSTOMER'S ORIGINAL MESSAGE:
${input.description || "(none)"}

CONVERSATION SO FAR (oldest first):
${threadText}

OPERATOR INSTRUCTION (what to say, or a rough draft to improve):
${input.instruction}

Write the reply now.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system,
    messages: [{ role: "user", content: user }],
  });

  if (response.content[0].type === "text") {
    return response.content[0].text.trim();
  }
  return "";
}
