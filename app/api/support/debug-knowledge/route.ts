import { NextResponse } from "next/server";
import { loadKnowledgeBase } from "@/lib/knowledge-loader";

export async function GET() {
  const topics = loadKnowledgeBase();
  const message = "how can we clone sales documents?";
  const lower = message.toLowerCase();

  const scored = topics
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      score: t.keywords.filter((kw) => lower.includes(kw.toLowerCase())).length,
      matched: t.keywords.filter((kw) => lower.includes(kw.toLowerCase())),
    }))
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return NextResponse.json({
    totalTopics: topics.length,
    query: message,
    topMatches: scored,
  });
}
