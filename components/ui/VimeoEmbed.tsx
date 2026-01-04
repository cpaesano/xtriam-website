"use client";

interface VimeoEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function VimeoEmbed({ videoId, title, className = "" }: VimeoEmbedProps) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-xl ${className}`}>
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?h=0&title=0&byline=0&portrait=0`}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        title={title || "Video"}
        loading="lazy"
      />
    </div>
  );
}
