"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  Sparkles,
  Wrench,
  Bug,
  Search,
  Rocket,
  Crown,
} from "lucide-react";
import { releases, type FeatureType, type Feature } from "@/data/whats-new";

const typeBadge: Record<
  FeatureType,
  { label: string; color: string; icon: React.ReactNode }
> = {
  new: {
    label: "New",
    color: "bg-green-100 text-green-700",
    icon: <Sparkles className="h-3 w-3" />,
  },
  improvement: {
    label: "Improvement",
    color: "bg-blue-100 text-blue-700",
    icon: <Wrench className="h-3 w-3" />,
  },
  fix: {
    label: "Fix",
    color: "bg-amber-100 text-amber-700",
    icon: <Bug className="h-3 w-3" />,
  },
};

export function WhatsNew() {
  const [search, setSearch] = useState("");
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    new Set([releases[0]?.month])
  );
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(
    new Set()
  );

  // Filter out internal features, then apply search
  const publicReleases = useMemo(() => {
    return releases
      .map((release) => ({
        ...release,
        features: release.features.filter((f) => !f.internal),
      }))
      .filter((r) => r.features.length > 0);
  }, []);

  const filteredReleases = useMemo(() => {
    if (!search.trim()) return publicReleases;

    const q = search.toLowerCase();
    return publicReleases
      .map((release) => ({
        ...release,
        features: release.features.filter(
          (f) =>
            f.title.toLowerCase().includes(q) ||
            f.summary.toLowerCase().includes(q) ||
            f.details.some((d) => d.toLowerCase().includes(q))
        ),
      }))
      .filter((r) => r.features.length > 0);
  }, [search, publicReleases]);

  // When searching, expand all months that have results
  const visibleExpandedMonths = useMemo(() => {
    if (search.trim()) {
      return new Set(filteredReleases.map((r) => r.month));
    }
    return expandedMonths;
  }, [search, filteredReleases, expandedMonths]);

  function toggleMonth(month: string) {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(month)) {
        next.delete(month);
      } else {
        next.add(month);
      }
      return next;
    });
  }

  function toggleFeature(key: string) {
    setExpandedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  const totalFeatures = publicReleases.reduce(
    (sum, r) => sum + r.features.length,
    0
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue-500 to-brand-blue-600 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              What&apos;s New in bpmPro
            </h1>
            <p className="text-sm text-gray-500">
              {totalFeatures} features and improvements across{" "}
              {releases.length} releases
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search features... (e.g. invoice, calendar, stripe)"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          >
            Clear
          </button>
        )}
      </div>

      {/* No results */}
      {filteredReleases.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <Search className="h-8 w-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            No features found matching &ldquo;{search}&rdquo;
          </p>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        {filteredReleases.map((release) => {
          const isExpanded = visibleExpandedMonths.has(release.month);
          const isPremium = release.month === "Premium Add-On";

          return (
            <div
              key={release.month}
              className={`rounded-xl border overflow-hidden transition-colors ${
                isPremium
                  ? "border-purple-200 bg-purple-50/30"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Month Header */}
              <button
                onClick={() => toggleMonth(release.month)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/80 transition-colors ${
                  isPremium ? "hover:bg-purple-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {isPremium ? (
                    <Crown className="h-5 w-5 text-purple-600" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-blue-500" />
                  )}
                  <div>
                    <span className="font-semibold text-gray-900">
                      {release.month}
                    </span>
                    {release.versions && (
                      <span className="ml-2 text-xs text-gray-500 font-normal">
                        {release.versions}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {release.features.length}{" "}
                    {release.features.length === 1 ? "update" : "updates"}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Features */}
              {isExpanded && (
                <div className="px-5 pb-4 space-y-3">
                  {release.features.map((feature, idx) => (
                    <FeatureCard
                      key={`${release.month}-${idx}`}
                      feature={feature}
                      featureKey={`${release.month}-${idx}`}
                      isExpanded={expandedFeatures.has(
                        `${release.month}-${idx}`
                      )}
                      onToggle={toggleFeature}
                      searchQuery={search}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-4 text-center">
        <p className="text-sm text-brand-blue-700">
          Questions about any feature?{" "}
          <a
            href="/support/chat"
            className="font-medium underline hover:text-brand-blue-900"
          >
            Ask our AI Assistant
          </a>{" "}
          or{" "}
          <a
            href="/support/tickets/new"
            className="font-medium underline hover:text-brand-blue-900"
          >
            create a support ticket
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  feature,
  featureKey,
  isExpanded,
  onToggle,
  searchQuery,
}: {
  feature: Feature;
  featureKey: string;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  searchQuery: string;
}) {
  const badge = typeBadge[feature.type];

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-medium text-gray-900">{feature.title}</h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.color}`}
            >
              {badge.icon}
              {badge.label}
            </span>
          </div>
          <p className="text-sm text-gray-600">{feature.summary}</p>
        </div>
      </div>

      {feature.details.length > 0 && (
        <>
          <button
            onClick={() => onToggle(featureKey)}
            className="mt-2 text-xs font-medium text-brand-blue-600 hover:text-brand-blue-800 transition-colors"
          >
            {isExpanded
              ? "Hide details"
              : `See details (${feature.details.length})`}
          </button>

          {isExpanded && (
            <ul className="mt-3 space-y-1.5 pl-4">
              {feature.details.map((detail, i) => (
                <li key={i} className="text-sm text-gray-600 relative">
                  <span className="absolute -left-3 top-2 w-1.5 h-1.5 rounded-full bg-gray-300" />
                  {searchQuery ? (
                    <HighlightMatch text={detail} query={searchQuery} />
                  ) : (
                    detail
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
