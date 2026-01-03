import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

// TODO: Replace with actual MDX content loading
const blogPosts: Record<string, {
  title: string;
  date: string;
  category: string;
  content: string;
}> = {
  "why-building-on-platforms-like-salesforce-is-a-game-changer-for-small-businesses": {
    title: "Why Building on Platforms Like Salesforce is a Game-Changer for Small Businesses",
    date: "June 5, 2024",
    category: "Technology",
    content: `
      <p>In today's competitive business landscape, small businesses need every advantage they can get. One of the most powerful advantages available is building your business software on established enterprise platforms like Salesforce.</p>

      <h2>The Platform Advantage</h2>
      <p>When you build on a platform like Salesforce, you're not starting from scratch. You're leveraging billions of dollars of investment in security, reliability, and features that would be impossible for a small company to build on its own.</p>

      <h2>Enterprise Security Without Enterprise Costs</h2>
      <p>Salesforce maintains SOC 2 Type II compliance, GDPR compliance, and numerous other security certifications. As a bpmPro customer, you automatically benefit from this enterprise-grade security without paying enterprise prices.</p>

      <h2>Reliability You Can Count On</h2>
      <p>With a 99.9% uptime guarantee and automatic backups, your business data is always available and protected. No more worrying about server maintenance or data loss.</p>

      <h2>Integration Ecosystem</h2>
      <p>The Salesforce AppExchange offers thousands of integrations with other business tools. Need to connect to your accounting software? There's probably already an integration available.</p>

      <h2>Conclusion</h2>
      <p>For window and door contractors looking to modernize their operations, choosing a platform-based solution like bpmPro means getting enterprise capabilities at a fraction of the cost of building custom software.</p>
    `,
  },
  "leveraging-ai-for-small-business-success-the-xtriam-story": {
    title: "Leveraging AI for Small Business Success: The xTriam Story",
    date: "January 8, 2024",
    category: "Innovation",
    content: `
      <p>Artificial intelligence isn't just for big tech companies anymore. At xTriam, we're using AI to help small window and door contractors compete more effectively.</p>

      <h2>AI-Powered Support</h2>
      <p>Our AI assistant can answer common questions about bpmPro instantly, 24/7. This means our customers get help when they need it, even outside business hours.</p>

      <h2>Smarter Workflows</h2>
      <p>AI helps identify patterns in your business data, suggesting optimizations you might not have noticed. From quote timing to inventory management, intelligent insights drive better decisions.</p>

      <h2>The Human Touch</h2>
      <p>While AI handles routine questions and data analysis, our human team focuses on what matters most: understanding your unique business challenges and building solutions that work for you.</p>
    `,
  },
};

// Generate static params for known blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: `${post.title} - xTriam Blog`,
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Post Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            This blog post could not be found.
          </p>
          <Link href="/blog" className="mt-6 inline-block">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <span className="rounded-full bg-brand-blue-100 px-3 py-1 text-xs font-medium text-brand-blue-700">
              {post.category}
            </span>
            <span>{post.date}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <article
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-brand-blue-600 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-foreground">
            Ready to transform your business?
          </h2>
          <p className="mt-2 text-muted-foreground">
            See how bpmPro can help your window and door business grow.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/book-a-demo">
              <Button variant="accent">Book a Demo</Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline">More Articles</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
