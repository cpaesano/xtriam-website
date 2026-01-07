"use client";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-xl ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title={title || "Video"}
        loading="lazy"
      />
    </div>
  );
}
