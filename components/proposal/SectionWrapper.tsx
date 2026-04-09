"use client";

import { CommentButton } from "./CommentThread";

interface SectionWrapperProps {
  sectionId: string;
  children: React.ReactNode;
}

export function SectionWrapper({ sectionId, children }: SectionWrapperProps) {
  return (
    <div className="relative">
      {children}
      <div className="absolute top-6 right-6 z-10">
        <CommentButton sectionId={sectionId} />
      </div>
    </div>
  );
}
