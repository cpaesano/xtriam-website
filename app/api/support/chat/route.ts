import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chat } from "@/lib/claude";
import { getSession } from "@/lib/session";

const messageSchema = z.object({
  message: z.string().min(1, "Message is required"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional()
    .default([]),
});

export async function POST(request: NextRequest) {
  try {
    // Verify session
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message, history } = messageSchema.parse(body);

    // Combine history with new message
    const messages = [...history, { role: "user" as const, content: message }];

    // Get AI response
    const response = await chat(messages);

    return NextResponse.json({
      success: true,
      message: response,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
