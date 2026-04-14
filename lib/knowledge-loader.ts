/**
 * Knowledge Base Loader
 *
 * Loads markdown files from /content/knowledge/ AND /content/tutorials/
 * and provides search functionality for the AI support agent.
 *
 * Knowledge files provide detailed topic coverage.
 * Tutorial files provide step-by-step guides and video tutorials.
 * Both are searchable by keyword matching.
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
 * Extract keywords from tutorial title and description.
 * Splits on spaces, filters out short/common words, and lowercases.
 */
function extractKeywordsFromText(title: string, description: string): string[] {
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
    "being", "have", "has", "had", "do", "does", "did", "will", "would",
    "could", "should", "may", "might", "can", "shall", "this", "that",
    "these", "those", "it", "its", "you", "your", "we", "our", "how",
    "what", "when", "where", "which", "who", "whom", "why", "all", "each",
    "every", "both", "few", "more", "most", "other", "some", "such", "no",
    "not", "only", "own", "same", "so", "than", "too", "very", "just",
    "about", "above", "after", "again", "also", "any", "because", "before",
    "between", "during", "into", "through", "under", "until", "up", "out",
    "then", "once", "here", "there", "if", "learn", "using", "step",
    "steps", "guide", "tutorial", "video", "show", "walk", "through",
  ]);

  const combined = `${title} ${description}`.toLowerCase();
  const words = combined
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  // Deduplicate
  const unique = [...new Set(words)];

  // Also add multi-word phrases from the title (e.g., "sales document", "dealer items")
  const titleLower = title.toLowerCase();
  const phrases: string[] = [];
  const titleWords = titleLower.replace(/[^a-z0-9\s]/g, "").split(/\s+/);
  for (let i = 0; i < titleWords.length - 1; i++) {
    const bigram = `${titleWords[i]} ${titleWords[i + 1]}`;
    if (bigram.length > 5) {
      phrases.push(bigram);
    }
  }

  return [...unique, ...phrases];
}

/**
 * Load knowledge topics from /content/knowledge/ markdown files
 */
function loadKnowledgeFiles(): KnowledgeTopic[] {
  const knowledgeDir = path.join(process.cwd(), "content", "knowledge");
  const topics: KnowledgeTopic[] = [];

  if (!fs.existsSync(knowledgeDir)) {
    console.warn("Knowledge directory not found:", knowledgeDir);
    return [];
  }

  const files = fs.readdirSync(knowledgeDir).filter((file) => {
    return (
      file.endsWith(".md") &&
      !file.startsWith("_") &&
      file !== "README.md" &&
      file !== "TUTORIALS_INDEX.md"
    );
  });

  for (const file of files) {
    try {
      const filePath = path.join(knowledgeDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

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

  return topics;
}

/**
 * Load tutorial content as knowledge topics from /content/tutorials/
 * Tutorials are automatically indexed for the AI chatbot.
 */
function loadTutorialFiles(): KnowledgeTopic[] {
  const tutorialsDir = path.join(process.cwd(), "content", "tutorials");
  const topics: KnowledgeTopic[] = [];

  if (!fs.existsSync(tutorialsDir)) {
    return [];
  }

  const files = fs.readdirSync(tutorialsDir).filter((file) => {
    return file.endsWith(".md") && file !== "README.md";
  });

  for (const file of files) {
    try {
      const filePath = path.join(tutorialsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const title = data.title || file.replace(".md", "").replace(/-/g, " ");
      const description = data.description || "";
      const slug = file.replace(".md", "");
      const isVideo = !!data.youtubeId;

      // Extract keywords from title and description
      const keywords = extractKeywordsFromText(title, description);

      // Add category-specific keywords
      if (data.category) {
        keywords.push(data.category);
      }

      const tutorialUrl = `/support/tutorials/${slug}`;

      // Build a concise content summary for the chatbot
      // Strip markdown images and keep text content
      const cleanContent = content
        .replace(/!\[.*?\]\(.*?\)/g, "") // remove markdown images
        .replace(/\n{3,}/g, "\n\n")      // collapse excess newlines
        .trim();

      topics.push({
        slug: `tutorial-${slug}`,
        title: `${title}${isVideo ? " (Video Tutorial)" : " (Step-by-Step Guide)"}`,
        keywords,
        category: data.category || "general",
        content: cleanContent,
        tutorialUrl,
      });
    } catch (error) {
      console.error(`Error loading tutorial ${file}:`, error);
    }
  }

  return topics;
}

/**
 * Load all knowledge topics from both knowledge files and tutorials
 */
export function loadKnowledgeBase(): KnowledgeTopic[] {
  if (knowledgeCache) {
    return knowledgeCache;
  }

  const knowledgeTopics = loadKnowledgeFiles();
  const tutorialTopics = loadTutorialFiles();

  knowledgeCache = [...knowledgeTopics, ...tutorialTopics];

  return knowledgeCache;
}

/**
 * Find relevant knowledge topics based on user message
 * Returns combined content from matching topics (max 3)
 * Prioritizes knowledge files over tutorials when scores are equal
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
    .sort((a, b) => {
      // Sort by score descending, then prioritize knowledge files over tutorials
      if (b.score !== a.score) return b.score - a.score;
      const aIsTutorial = a.topic.slug.startsWith("tutorial-") ? 1 : 0;
      const bIsTutorial = b.topic.slug.startsWith("tutorial-") ? 1 : 0;
      return aIsTutorial - bIsTutorial;
    })
    .slice(0, 3);

  if (scoredTopics.length === 0) {
    return "";
  }

  return scoredTopics
    .map((item) => {
      const tutorialNote = item.topic.tutorialUrl
        ? `\n\n**Full Tutorial for ${item.topic.title}:** [View step-by-step guide with screenshots](${item.topic.tutorialUrl})`
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
