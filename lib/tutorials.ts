import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const TUTORIALS_DIR = path.join(process.cwd(), 'content/tutorials');

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
  lastUpdated?: string;
}

export interface TutorialMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
}

function extractTitle(content: string, filename: string): string {
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) return headingMatch[1];

  const boldMatch = content.match(/^\*\*(.+?)\*\*/m);
  if (boldMatch) return boldMatch[1];

  return filename
    .replace('.md', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractDescription(content: string): string {
  const cleanContent = content.replace(/^---[\s\S]*?---\n?/, '');
  const paragraphs = cleanContent
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p && !p.startsWith('#') && !p.startsWith('!') && !p.startsWith('[') && p.length > 20);

  if (paragraphs.length > 0) {
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

function guessCategory(content: string): string {
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes('payment') || lowerContent.includes('commission') || lowerContent.includes('stripe')) {
    return 'financial';
  }
  if (lowerContent.includes('calendar') || lowerContent.includes('installation') || lowerContent.includes('work assignment')) {
    return 'operations';
  }
  if (lowerContent.includes('quote') || lowerContent.includes('proposal') || lowerContent.includes('sales document')) {
    return 'sales';
  }
  if (lowerContent.includes('setup') || lowerContent.includes('employee') || lowerContent.includes('onboarding')) {
    return 'admin';
  }

  return 'general';
}

export function getAllTutorials(): TutorialMeta[] {
  if (!fs.existsSync(TUTORIALS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(TUTORIALS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md');

  return files.map(file => {
    const filePath = path.join(TUTORIALS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);

    const slug = file.replace('.md', '');
    const title = frontmatter.title || extractTitle(body, file);
    const description = extractDescription(body);
    const category = frontmatter.category || guessCategory(body);

    return { slug, title, description, category };
  });
}

export function getTutorialBySlug(slug: string): Tutorial | null {
  const filePath = path.join(TUTORIALS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(fileContent);

  const title = frontmatter.title || extractTitle(body, `${slug}.md`);
  const description = extractDescription(body);
  const category = frontmatter.category || guessCategory(body);

  // Get file modification time
  const stats = fs.statSync(filePath);
  const lastUpdated = stats.mtime.toISOString().split('T')[0];

  return {
    slug,
    title,
    description,
    category,
    content: body,
    lastUpdated
  };
}

export function getAllTutorialSlugs(): string[] {
  if (!fs.existsSync(TUTORIALS_DIR)) {
    return [];
  }

  return fs.readdirSync(TUTORIALS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(f => f.replace('.md', ''));
}
