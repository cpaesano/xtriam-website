"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Viewer {
  viewerId: string;
  viewerName: string;
  viewerRole: "client" | "owner" | "contributor";
  viewerAvatar: string;
  proposalCode: string;
}

const ViewerContext = createContext<Viewer | null>(null);

export function useViewer() {
  return useContext(ViewerContext);
}

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [viewer, setViewer] = useState<Viewer | null>(null);

  useEffect(() => {
    fetch("/api/proposal/session")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setViewer(data);
      })
      .catch(() => {});
  }, []);

  return (
    <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>
  );
}
