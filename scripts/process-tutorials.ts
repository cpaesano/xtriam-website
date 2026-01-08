/**
 * Tutorial Processing Script
 *
 * Reads markdown tutorials from /content/tutorials/
 * Generates:
 * - AI knowledge base summaries in /content/knowledge/
 * - Tutorial data for the website
 *
 * Run with: npx ts-node scripts/process-tutorials.ts
 * Or: npm run process-tutorials
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const TUTORIALS_DIR = path.join(process.cwd(), 'content/tutorials');
const KNOWLEDGE_DIR = path.join(process.cwd(), 'content/knowledge');
const TUTORIALS_DATA_FILE = path.join(process.cwd(), 'content/tutorials-data.json');

interface TutorialMeta {
  slug: string;
  title: string;
  category: string;
  keywords: string[];
  description: string;
  sourceFile: string;
  lastUpdated: string;
}

function extractTitle(content: string, filename: string): string {
  // Try to find a heading
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) return headingMatch[1];

  // Try to find bold title (Scribe format)
  const boldMatch = content.match(/^\*\*(.+?)\*\*/m);
  if (boldMatch) return boldMatch[1];

  // Fall back to filename
  return filename
    .replace('.md', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractDescription(content: string): string {
  // Remove frontmatter
  const cleanContent = content.replace(/^---[\s\S]*?---\n?/, '');

  // Get first meaningful paragraph
  const paragraphs = cleanContent
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p && !p.startsWith('#') && !p.startsWith('!') && p.length > 20);

  if (paragraphs.length > 0) {
    // Clean markdown formatting
    let desc = paragraphs[0]
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .substring(0, 200);

    if (desc.length === 200) desc += '...';
    return desc;
  }

  return 'Tutorial guide for bpmPro';
}

function extractKeywords(content: string, title: string): string[] {
  const keywords: Set<string> = new Set();

  // Add words from title
  title.toLowerCase().split(/\s+/).forEach(word => {
    if (word.length > 3) keywords.add(word);
  });

  // Common bpmPro terms to look for
  const bpmProTerms = [
    'account', 'contact', 'project', 'sales document', 'quote', 'proposal',
    'payment', 'stripe', 'calendar', 'work assignment', 'installation',
    'commission', 'report', 'dashboard', 'csv', 'import', 'export',
    'lead', 'quickstart', 'employee', 'sales person', 'discount',
    'chargeback', 'permit', 'inspection', 'specialty item'
  ];

  const lowerContent = content.toLowerCase();
  bpmProTerms.forEach(term => {
    if (lowerContent.includes(term)) {
      keywords.add(term);
    }
  });

  return Array.from(keywords).slice(0, 10);
}

function guessCategory(content: string, keywords: string[]): string {
  const lowerContent = content.toLowerCase();

  if (keywords.some(k => ['payment', 'stripe', 'commission', 'chargeback', 'invoice'].includes(k))) {
    return 'financial';
  }
  if (keywords.some(k => ['calendar', 'installation', 'work assignment', 'inspection', 'permit'].includes(k))) {
    return 'operations';
  }
  if (keywords.some(k => ['quote', 'proposal', 'sales document', 'lead', 'close deal'].includes(k))) {
    return 'sales';
  }
  if (keywords.some(k => ['setup', 'employee', 'sales person', 'onboarding', 'company'].includes(k))) {
    return 'admin';
  }

  return 'general';
}

function generateKnowledgeBaseSummary(
  slug: string,
  title: string,
  content: string,
  category: string,
  keywords: string[]
): string {
  // Create a summary version for the AI knowledge base
  // Remove image references and clean up
  let summary = content
    .replace(/^---[\s\S]*?---\n?/, '') // Remove frontmatter
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/\n{3,}/g, '\n\n') // Clean up extra newlines
    .trim();

  // Truncate if too long (keep first ~1500 chars for AI context)
  if (summary.length > 1500) {
    summary = summary.substring(0, 1500) + '\n\n[Content truncated - see full tutorial]';
  }

  const frontmatter = `---
title: "${title}"
keywords:
${keywords.map(k => `  - ${k}`).join('\n')}
category: "${category}"
tutorialUrl: "/tutorials/${slug}"
---`;

  return `${frontmatter}

${title}

${summary}

---

Full Tutorial:
For the complete step-by-step guide with screenshots, visit: /tutorials/${slug}

`;
}

function processTutorials() {
  console.log('🔄 Processing tutorials...\n');

  // Ensure directories exist
  if (!fs.existsSync(TUTORIALS_DIR)) {
    console.log('📁 Creating tutorials directory...');
    fs.mkdirSync(TUTORIALS_DIR, { recursive: true });
  }
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    console.log('📁 Creating knowledge directory...');
    fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
  }

  // Get all markdown files (except README)
  const files = fs.readdirSync(TUTORIALS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md');

  if (files.length === 0) {
    console.log('📭 No tutorials found in /content/tutorials/');
    console.log('   Export a tutorial from Scribe as Markdown and save it there.\n');
    return;
  }

  const tutorials: TutorialMeta[] = [];

  for (const file of files) {
    const filePath = path.join(TUTORIALS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);

    const slug = file.replace('.md', '');
    const title = frontmatter.title || extractTitle(body, file);
    const keywords = frontmatter.keywords || extractKeywords(body, title);
    const category = frontmatter.category || guessCategory(body, keywords);
    const description = extractDescription(body);

    console.log(`📄 Processing: ${file}`);
    console.log(`   Title: ${title}`);
    console.log(`   Category: ${category}`);
    console.log(`   Keywords: ${keywords.slice(0, 5).join(', ')}...\n`);

    // Generate knowledge base file
    const knowledgeContent = generateKnowledgeBaseSummary(slug, title, body, category, keywords);
    const knowledgeFile = path.join(KNOWLEDGE_DIR, `tutorial-${slug}.md`);
    fs.writeFileSync(knowledgeFile, knowledgeContent);
    console.log(`   ✅ Created knowledge base: tutorial-${slug}.md`);

    // Add to tutorials list
    tutorials.push({
      slug,
      title,
      category,
      keywords,
      description,
      sourceFile: file,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  }

  // Save tutorials data for the website
  fs.writeFileSync(TUTORIALS_DATA_FILE, JSON.stringify(tutorials, null, 2));
  console.log(`\n✅ Processed ${tutorials.length} tutorial(s)`);
  console.log(`📚 Tutorials data saved to: content/tutorials-data.json`);
  console.log(`\n🌐 Tutorials will be available at: /tutorials/[slug]`);
}

// Run the processor
processTutorials();
