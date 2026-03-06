"use client";

import { useState } from "react";

interface VimeoFacadeProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function VimeoFacade({ videoId, title, className = "" }: VimeoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden rounded-xl ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
          title={title || "Video"}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={`relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900 group cursor-pointer ${className}`}
      aria-label={`Play video: ${title || "Video"}`}
    >
      {/* Vimeo thumbnail */}
      <img
        src={`https://vumbnail.com/${videoId}.jpg`}
        alt={title || "Video thumbnail"}
        className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        loading="lazy"
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-brand-blue-700 group-hover:scale-110 transition-all">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
