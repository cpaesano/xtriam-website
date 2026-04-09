"use client";

import { CommentButton } from "./CommentThread";

interface SectionWrapperProps {
  sectionId: string;
  children: React.ReactNode;
}

export function SectionWrapper({ sectionId, children }: SectionWrapperProps) {
  return (
    <div>
      {children}
      <div className="flex justify-center -mt-8 pb-8 relative z-10">
        <CommentButton sectionId={sectionId} />
      </div>
    </div>
  );
}
