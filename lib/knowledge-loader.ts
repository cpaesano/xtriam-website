/**
 * Knowledge Base Loader
 *
 * Loads markdown files from /content/knowledge/ and provides
 * search functionality for the AI support agent.
 *
 * Files are loaded at build time and cached for performance.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface KnowledgeTopic {
  slug: string;
  title: string;
  keywords: string[];
  category: string;
  content: string;
  tutorialUrl?: string;
}

// Cache for loaded knowledge
let knowledgeCache: KnowledgeTopic[] | null = null;

/**
 * Load all knowledge topics from markdown files
 */
export function loadKnowledgeBase(): KnowledgeTopic[] {
  // Return cached version if available
  if (knowledgeCache) {
    return knowledgeCache;
  }

  const knowledgeDir = path.join(process.cwd(), "content", "knowledge");
  const topics: KnowledgeTopic[] = [];

  // Check if directory exists
  if (!fs.existsSync(knowledgeDir)) {
    console.warn("Knowledge directory not found:", knowledgeDir);
    return [];
  }

  // Read all markdown files
  const files = fs.readdirSync(knowledgeDir).filter((file) => {
    // Skip template, README, and non-markdown files
    return (
      file.endsWith(".md") &&
      !file.startsWith("_") &&
      file !== "README.md"
    );
  });

  for (const file of files) {
    try {
      const filePath = path.join(knowledgeDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      // Validate required frontmatter
      if (!data.title || !data.keywords) {
        console.warn(`Skipping ${file}: missing required frontmatter`);
        continue;
      }

      topics.push({
        slug: file.replace(".md", ""),
        title: data.title,
        keywords: Array.isArray(data.keywords) ? data.keywords : [data.keywords],
        category: data.category || "general",
        content: content.trim(),
        tutorialUrl: data.tutorialUrl,
      });
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  }

  // Cache the results
  knowledgeCache = topics;

  return topics;
}

/**
 * Find relevant knowledge topics based on user message
 * Returns combined content from matching topics (max 3)
 */
export function getRelevantKnowledge(userMessage: string): string {
  const topics = loadKnowledgeBase();
  const lowerMessage = userMessage.toLowerCase();

  // Score each topic by keyword matches
  const scoredTopics = topics
    .map((topic) => {
      const matchCount = topic.keywords.filter((kw) =>
        lowerMessage.includes(kw.toLowerCase())
      ).length;
      return { topic, score: matchCount };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scoredTopics.length === 0) {
    return "";
  }

  return scoredTopics
    .map((item) => {
      const tutorialNote = item.topic.tutorialUrl
        ? `\n\n**Full Tutorial:** [View step-by-step guide with screenshots](${item.topic.tutorialUrl})`
        : "";
      return `## ${item.topic.title}\n\n${item.topic.content}${tutorialNote}`;
    })
    .join("\n\n---\n\n");
}

/**
 * Get all available topic titles (for debugging/admin)
 */
export function getAvailableTopics(): string[] {
  return loadKnowledgeBase().map((topic) => topic.title);
}

/**
 * Get topics by category
 */
export function getTopicsByCategory(category: string): KnowledgeTopic[] {
  return loadKnowledgeBase().filter((topic) => topic.category === category);
}

/**
 * Clear the cache (useful for development)
 */
export function clearKnowledgeCache(): void {
  knowledgeCache = null;
}

/**
 * Get a specific topic by slug
 */
export function getTopicBySlug(slug: string): KnowledgeTopic | undefined {
  return loadKnowledgeBase().find((topic) => topic.slug === slug);
}
