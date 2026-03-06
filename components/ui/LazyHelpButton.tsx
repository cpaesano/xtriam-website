"use client";

import dynamic from "next/dynamic";

const FloatingHelpButton = dynamic(
  () => import("./FloatingHelpButton").then((m) => m.FloatingHelpButton),
  { ssr: false }
);

export function LazyHelpButton() {
  return <FloatingHelpButton />;
}
