import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getTutorialBySlug, getAllTutorialSlugs } from "@/lib/tutorials";

interface Props {
  params: Promise<{ slug: string }>;
}

const categoryColors: Record<string, string> = {
  sales: "bg-blue-100 text-blue-800",
  operations: "bg-green-100 text-green-800",
  financial: "bg-yellow-100 text-yellow-800",
  admin: "bg-purple-100 text-purple-800",
  general: "bg-gray-100 text-gray-800",
};

const categoryLabels: Record<string, string> = {
  sales: "Sales",
  operations: "Operations",
  financial: "Financial",
  admin: "Admin",
  general: "General",
};

export async function generateStaticParams() {
  const slugs = getAllTutorialSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/tutorials"
            className="text-brand-blue-600 hover:text-brand-blue-700 flex items-center gap-1 mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tutorials
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[tutorial.category]}`}>
                {categoryLabels[tutorial.category] || tutorial.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{tutorial.title}</h1>
              {tutorial.lastUpdated && (
                <p className="text-gray-500 mt-2">Last updated: {tutorial.lastUpdated}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <article className="tutorial-content">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-base font-medium text-gray-700 mt-4 mb-2">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-brand-blue-600 hover:text-brand-blue-700 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <figure className="my-6">
                      <img
                        src={src}
                        alt={alt || "Tutorial screenshot"}
                        className="rounded-lg border border-gray-200 shadow-sm w-full"
                        loading="lazy"
                      />
                      {alt && (
                        <figcaption className="text-sm text-gray-500 mt-2 text-center">
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand-blue-500 pl-4 my-4 italic text-gray-600">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                      {children}
                    </code>
                  ),
                  hr: () => <hr className="my-8 border-gray-200" />,
                }}
              >
                {tutorial.content}
              </ReactMarkdown>
            </article>
          </div>

          {/* Help Banner */}
          <div className="mt-8 bg-brand-blue-50 rounded-xl p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Need more help?</h3>
            <p className="text-gray-600 mb-4">
              Our AI assistant can answer follow-up questions, or contact support for personalized help.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/support/chat"
                className="px-5 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition-colors text-sm"
              >
                Ask AI Assistant
              </Link>
              <a
                href="tel:+13052046694"
                className="px-5 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Call (305) 204-9694
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
