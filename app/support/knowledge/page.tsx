import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Base | bpmPro Customer Portal",
  description: "Find answers to common questions and learn how to use bpmPro.",
};

export default function KnowledgePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Knowledge Base</h1>
        <p className="mt-1 text-muted-foreground">
          Find answers, tutorials, and resources to help you get the most out of{" "}
          <strong>bpmPro</strong>
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/support/faqs"
          className="group rounded-xl border border-border bg-background p-6 shadow-sm hover:border-brand-blue-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-brand-blue-600">
                FAQs
              </h3>
              <p className="text-sm text-muted-foreground">
                Common questions answered
              </p>
            </div>
          </div>
        </Link>

        <div className="rounded-xl border border-border bg-muted/30 p-6 opacity-60 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-100 text-brand-orange-400">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground">
                Video Library
              </h3>
              <p className="text-sm text-muted-foreground">
                Tutorials and walkthroughs (Coming Soon)
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-6 opacity-60 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground">
                Features Guide
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore all features (Coming Soon)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Popular Topics
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {popularTopics.map((topic, index) => (
            <Link
              key={index}
              href={topic.href}
              target="_blank"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/30 hover:border-brand-blue-300 transition-all"
            >
              <span className="text-2xl">{topic.icon}</span>
              <div>
                <h4 className="font-medium text-foreground">{topic.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Still need help */}
      <div className="rounded-xl border border-brand-blue-200 bg-brand-blue-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-brand-blue-900">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="mt-1 text-sm text-brand-blue-700">
              Our AI assistant can help answer your questions instantly, or you
              can create a support ticket for personalized help from our team.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/support/chat"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-600 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Chat with AI
              </Link>
              <Link
                href="/support/tickets/new"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-blue-300 bg-white px-4 py-2 text-sm font-medium text-brand-blue-700 hover:bg-brand-blue-50 transition-colors"
              >
                Create Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const popularTopics = [
  {
    icon: "📊",
    title: "Creating Quotes & Proposals",
    description: "Generate professional quotes quickly",
    href: "/faqs#quoting",
  },
  {
    icon: "📋",
    title: "Managing Projects",
    description: "Track jobs from sale to installation",
    href: "/faqs#projects",
  },
  {
    icon: "💳",
    title: "Payment Processing",
    description: "Accept payments with Stripe integration",
    href: "/payment-processing-with-stripe-integration",
  },
  {
    icon: "📈",
    title: "Reports & Dashboards",
    description: "Track your business performance",
    href: "/faqs#reporting",
  },
  {
    icon: "👥",
    title: "Lead Management",
    description: "Capture and convert leads",
    href: "/faqs#leads",
  },
  {
    icon: "📱",
    title: "Mobile Access",
    description: "Use bpmPro on the go",
    href: "/faqs#mobile",
  },
];
