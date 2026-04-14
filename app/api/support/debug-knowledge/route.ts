import { NextResponse } from "next/server";
import { getAvailableTopics, loadKnowledgeBase, getRelevantKnowledge } from "@/lib/knowledge-loader";

export async function GET() {
  const topics = loadKnowledgeBase();
  const available = getAvailableTopics();

  // Test clone query
  const cloneResult = getRelevantKnowledge("how can we clone sales documents?");

  return NextResponse.json({
    totalTopics: topics.length,
    topicTitles: available,
    cloneTestResult: cloneResult ? cloneResult.substring(0, 200) + "..." : "NO MATCH",
  });
}
