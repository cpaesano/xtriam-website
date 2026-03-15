import Link from "next/link";
import { getAllTutorials } from "@/lib/tutorials";
import { TutorialList } from "@/components/support/TutorialList";

export default function TutorialsPage() {
  const tutorials = getAllTutorials();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tutorials</h1>
        <p className="text-gray-600 mt-1">
          Step-by-step guides with screenshots to help you master bpmPro.
        </p>
      </div>

      {/* Content */}
      {tutorials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Tutorials coming soon
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            We&apos;re building step-by-step guides for every part of bpmPro.
            Check back soon or ask our AI Assistant for help in the meantime.
          </p>
          <Link
            href="/support/chat"
            className="inline-block mt-6 px-6 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition-colors"
          >
            Chat with AI Assistant
          </Link>
        </div>
      ) : (
        <TutorialList tutorials={tutorials} />
      )}
    </div>
  );
}
