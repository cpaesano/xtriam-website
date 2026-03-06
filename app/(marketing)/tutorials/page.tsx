import Link from "next/link";
import { getAllTutorials } from "@/lib/tutorials";

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

export default function TutorialsPage() {
  const tutorials = getAllTutorials();

  // Group by category
  const grouped = tutorials.reduce((acc, tutorial) => {
    const cat = tutorial.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tutorial);
    return acc;
  }, {} as Record<string, typeof tutorials>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">bpmPro Tutorials</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Step-by-step guides with screenshots to help you master bpmPro.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {tutorials.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No tutorials yet</h2>
            <p className="text-gray-500">
              Tutorials will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([category, categoryTutorials]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[category]}`}>
                    {categoryLabels[category] || category}
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTutorials.map((tutorial) => (
                    <Link
                      key={tutorial.slug}
                      href={`/tutorials/${tutorial.slug}`}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-brand-blue-300 transition-all group"
                    >
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-blue-600 mb-2">
                        {tutorial.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {tutorial.description}
                      </p>
                      <div className="mt-4 text-brand-blue-600 text-sm font-medium flex items-center gap-1">
                        View tutorial
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-gray-600 mb-4">
            Our AI assistant can help answer your questions, or contact support directly.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/support/chat"
              className="px-6 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition-colors"
            >
              Chat with AI Assistant
            </Link>
            <a
              href="tel:+13052046694"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Call Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
