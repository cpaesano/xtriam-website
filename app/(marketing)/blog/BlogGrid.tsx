"use client";

import { useState } from "react";
import Link from "next/link";

const POSTS_PER_PAGE = 6;

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  imageAspect?: "square";
}

interface BlogGridProps {
  posts: BlogPost[];
  categories: string[];
}

export function BlogGrid({ posts, categories }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + POSTS_PER_PAGE);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1); // Reset to page 1 when filtering
  }

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-brand-blue-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-brand-blue-100 hover:text-brand-blue-700"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 opacity-60">
                ({posts.filter((p) => p.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((post) => (
          <article
            key={post.slug}
            className="group rounded-xl border border-border bg-background shadow-sm transition-all hover:shadow-md hover:border-brand-blue-200 overflow-hidden"
          >
            {post.image && (
              <Link href={`/post/${post.slug}`} className="block">
                <div className={`${post.imageAspect === "square" ? "aspect-square" : "aspect-video"} overflow-hidden bg-muted`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            )}
            <div className="p-5">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-brand-blue-100 px-3 py-1 text-xs font-medium text-brand-blue-700">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-foreground group-hover:text-brand-blue-600 transition-colors leading-snug">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
              <Link
                href={`/post/${post.slug}`}
                className="mt-3 inline-flex items-center text-sm font-medium text-brand-blue-600 hover:text-brand-blue-700"
              >
                Read more
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No posts in this category yet.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-brand-blue-600 text-white"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Post count */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Showing {startIdx + 1}–{Math.min(startIdx + POSTS_PER_PAGE, filtered.length)} of {filtered.length} posts
        {activeCategory !== "All" && <span> in {activeCategory}</span>}
      </div>
    </div>
  );
}
