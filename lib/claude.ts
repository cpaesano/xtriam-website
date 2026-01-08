import Anthropic from "@anthropic-ai/sdk";
import type { ChatMessage } from "@/types/auth";
import { getRelevantKnowledge } from "./knowledge-base";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Base system prompt for bpmPro support
const BASE_SYSTEM_PROMPT = `You are a helpful customer support assistant for bpmPro, a Salesforce-native CRM++ solution designed specifically for window and door contractors.

## About bpmPro
- Built on the Salesforce.com platform
- Designed for window and door contractors in Florida
- Developed by xTriam, LLC

## Key Features
- **Sales Documents**: Create professional quotes and proposals in minutes
- **Projects Board**: Track every project from sale to installation with visual Kanban-style boards
- **Close Deal Wizard**: Streamlined contract signing and deal closure process
- **Payments & Stripe Integration**: Accept payments and track cash flow easily
- **Commission Payout Manager**: Automated commission calculations and tracking
- **Reports & Dashboards**: Real-time insights into business performance
- **Email Wizard**: Professional email templates and automation
- **Team Notifications**: Keep your team informed with automated alerts
- **Product Order Console**: Manage product orders and inventory

## Support Information
- **Support Hours**: Monday - Friday, 8:00 AM - 6:00 PM EST
- **Phone**: (305) 204-9694
- **Email**: support@xtriam.com
- **Sales**: sales@xtriam.com
- **Website**: https://www.xtriam.com

## Your Role
- Be helpful, professional, and concise
- Answer questions about bpmPro features and functionality
- Help troubleshoot common issues
- Guide users through basic processes using the documentation provided
- If you don't know something specific about a customer's account or a technical issue you cannot resolve, suggest they:
  1. Create a support ticket for further assistance
  2. Contact support directly at (305) 204-9694
  3. Email support@xtriam.com

## Important Notes
- Never share or ask for sensitive information like passwords or payment details
- Always be honest if you're unsure about something
- Use the documentation provided below to give accurate, detailed answers
- If the documentation doesn't cover their question, say so and suggest contacting support
- Keep responses concise but thorough
- Format responses with clear steps when explaining how to do something`;

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

## Relevant Documentation

Use the following documentation to answer the user's question:

${relevantKnowledge}

---

Use this documentation to provide accurate, step-by-step guidance. If the user's question isn't covered in the documentation above, acknowledge that and suggest they create a support ticket or contact support directly.`;
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
  return `Hello! I'm your bpmPro support assistant. I can help you with:

- Questions about bpmPro features
- How to use specific functionality
- Troubleshooting common issues
- General information about the platform

How can I assist you today?`;
}
