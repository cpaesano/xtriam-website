"use client";

import { useState } from "react";
import Link from "next/link";

interface TutorialMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  youtubeId?: string;
}

type FilterType = "all" | "videos" | "guides";

const categoryColors: Record<string, string> = {
  sales: "bg-blue-100 text-blue-800",
  operations: "bg-green-100 text-green-800",
  financial: "bg-yellow-100 text-yellow-800",
  admin: "bg-purple-100 text-purple-800",
  estimating: "bg-orange-100 text-orange-800",
  general: "bg-gray-100 text-gray-800",
};

const categoryLabels: Record<string, string> = {
  sales: "Sales",
  operations: "Operations",
  financial: "Financial",
  estimating: "Estimating",
  admin: "Admin",
  general: "General",
};

function TutorialCard({ tutorial }: { tutorial: TutorialMeta }) {
  return (
    <Link
      href={`/support/tutorials/${tutorial.slug}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-brand-blue-300 transition-all group"
    >
      {tutorial.youtubeId && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3 bg-gray-900">
          <img
            src={`https://img.youtube.com/vi/${tutorial.youtubeId}/mqdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 group-hover:scale-110 transition-all">
              <svg
                className="w-5 h-5 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[tutorial.category]}`}
        >
          {categoryLabels[tutorial.category] || tutorial.category}
        </span>
        {tutorial.youtubeId && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Video
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-brand-blue-600 mb-2">
        {tutorial.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-3">
        {tutorial.description}
      </p>
      <div className="mt-3 text-brand-blue-600 text-sm font-medium flex items-center gap-1">
        {tutorial.youtubeId ? "Watch video" : "View tutorial"}
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}

function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: FilterType;
  onChange: (f: FilterType) => void;
  counts: { all: number; videos: number; guides: number };
}) {
  const tabs: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "videos", label: "Videos", count: counts.videos },
    { key: "guides", label: "Step-by-Step Guides", count: counts.guides },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            active === tab.key
              ? "bg-brand-blue-600 text-white"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {tab.label}
          <span
            className={`ml-1.5 text-xs ${
              active === tab.key ? "text-blue-200" : "text-gray-400"
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}

function GroupedView({ tutorials }: { tutorials: TutorialMeta[] }) {
  const grouped = tutorials.reduce(
    (acc, tutorial) => {
      const cat = tutorial.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(tutorial);
      return acc;
    },
    {} as Record<string, TutorialMeta[]>
  );

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([category, categoryTutorials]) => (
        <div key={category}>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm ${categoryColors[category]}`}
            >
              {categoryLabels[category] || category}
            </span>
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {categoryTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.slug} tutorial={tutorial} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TutorialList({ tutorials }: { tutorials: TutorialMeta[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const videoCount = tutorials.filter((t) => t.youtubeId).length;
  const guideCount = tutorials.filter((t) => !t.youtubeId).length;

  // Apply type filter
  const typeFiltered =
    filter === "videos"
      ? tutorials.filter((t) => t.youtubeId)
      : filter === "guides"
        ? tutorials.filter((t) => !t.youtubeId)
        : tutorials;

  // Apply search filter
  const searchFiltered = query.trim()
    ? typeFiltered.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (categoryLabels[t.category] || t.category)
            .toLowerCase()
            .includes(q)
        );
      })
    : null;

  return (
    <>
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search tutorials..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <FilterTabs
        active={filter}
        onChange={setFilter}
        counts={{
          all: tutorials.length,
          videos: videoCount,
          guides: guideCount,
        }}
      />

      {/* Search Results */}
      {searchFiltered !== null ? (
        searchFiltered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">
              No tutorials found for &ldquo;{query}&rdquo;
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-3 text-brand-blue-600 text-sm hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              {searchFiltered.length} result
              {searchFiltered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {searchFiltered.map((tutorial) => (
                <TutorialCard key={tutorial.slug} tutorial={tutorial} />
              ))}
            </div>
          </div>
        )
      ) : (
        /* Default Grouped View */
        <GroupedView tutorials={typeFiltered} />
      )}
    </>
  );
}
