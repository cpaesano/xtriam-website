"use client";

import { useState, useEffect } from "react";
import { SectionReveal } from "../SectionReveal";
import { useViewer } from "../ViewerProvider";
import { Lightbulb, Check } from "lucide-react";
import { getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const features = [
  { id: "ai-assistant", label: "AI Operations Assistant", description: "Conversational AI for instant operational insights: order status, top dealers, profitability, via text or voice" },
  { id: "visual-configurator", label: "Visual product configurator (2D)", description: "SVG-based preview of configured door/window in the CPQ" },
  { id: "dealer-self-service", label: "Dealer self-service onboarding", description: "Public application flow where dealers apply and Palm City approves" },
  { id: "territory-enforcement", label: "Territory enforcement", description: "Block or flag orders outside a dealer's assigned territory" },
  { id: "quote-followup", label: "Quote expiration follow-up", description: "Automated reminder sequence before and after quote expiry" },
  { id: "end-client-esign", label: "End-client e-signature on proposals", description: "Legal signature from the homeowner before order conversion" },
  { id: "offline-cpq", label: "Offline / mobile CPQ", description: "Dealers build quotes at job sites without connectivity" },
  { id: "analytics-dashboard", label: "Advanced analytics dashboard", description: "BigQuery export, Looker Studio integration, conversion rates" },
  { id: "ai-photo-rendering", label: "AI photo rendering on uploaded elevations", description: "Dealer uploads a photo of the entryway. AI generates a color rendering with your door/window product, multiple finish options side-by-side" },
  { id: "address-lookup-rendering", label: "Google Maps / Zillow address lookup", description: "Customer enters their address, system pulls a street view or listing photo and overlays your products onto the actual home" },
  { id: "website-lead-gen", label: "Website lead generation configurator", description: "Homeowner visits your website, sees their home with your products rendered on it, configures what they want with real-time pricing, submits as a lead routed to the nearest dealer" },
  { id: "drawing-integration", label: "Drawing phase integration", description: "Dealers upload shop drawings or elevation sketches. AI extracts dimensions and specs automatically, populates the configurator for real-time pricing" },
  { id: "ai-quoting", label: "AI-assisted quoting", description: "Suggest add-ons, flag low-margin quotes, surface stale opportunities" },
  { id: "erp-integrations", label: "Additional ERP integrations", description: "Dynamics GP, custom CSV exports" },
  { id: "expanded-bistrack", label: "Expanded BisTrack integration", description: "AP/AR sync, deeper production status, invoice delivery" },
  { id: "more-channels", label: "Additional notification channels", description: "Push notifications, WhatsApp" },
  { id: "multi-language", label: "Multi-language dealer portal", description: "Spanish-language support for the dealer network" },
];

function getDb() {
  const app = getApps().find(a => a.name === "proposals");
  return app ? getFirestore(app) : null;
}

export function FutureVisionSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [allVotes, setAllVotes] = useState<Record<string, string[]>>({}); // featureId → viewerIds
  const viewer = useViewer();

  // Load votes from Firestore
  useEffect(() => {
    const db = getDb();
    if (!db) return;

    async function load() {
      const ref = doc(db!, "proposal_votes", "palmcity");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as Record<string, string[]>;
        setAllVotes(data);
        // Set current viewer's selections
        if (viewer) {
          const mySelections = new Set<string>();
          for (const [featureId, voters] of Object.entries(data)) {
            if (voters.includes(viewer.viewerId)) {
              mySelections.add(featureId);
            }
          }
          setSelected(mySelections);
        }
      }
    }
    load();
  }, [viewer]);

  async function toggle(featureId: string) {
    const db = getDb();
    if (!db || !viewer) return;

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(featureId)) next.delete(featureId);
      else next.add(featureId);
      return next;
    });

    // Update Firestore
    const ref = doc(db, "proposal_votes", "palmcity");
    const currentVoters = allVotes[featureId] || [];
    const isSelected = currentVoters.includes(viewer.viewerId);

    const updatedVoters = isSelected
      ? currentVoters.filter(v => v !== viewer.viewerId)
      : [...currentVoters, viewer.viewerId];

    const updatedAllVotes = { ...allVotes, [featureId]: updatedVoters };
    setAllVotes(updatedAllVotes);

    await setDoc(ref, updatedAllVotes, { merge: true });
  }

  // Count total unique voters across all features
  function getVoterCount(featureId: string): number {
    return (allVotes[featureId] || []).length;
  }

  return (
    <section id="future" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-12">
            <p className="text-brand-blue-600 dark:text-brand-blue-400 font-bold tracking-widest uppercase text-base mb-3">
              Beyond Phase 1
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What matters most to you?
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the features that would have the biggest impact on your operation.
              Your priorities shape the roadmap.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="bg-muted/50 border border-border rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-brand-orange-500" />
              <span className="text-lg text-muted-foreground">
                Click to select &middot; {selected.size} of {features.length} selected
              </span>
            </div>

            <div className="space-y-3">
              {features.map((f, i) => {
                const voterCount = getVoterCount(f.id);
                return (
                  <SectionReveal key={f.id} delay={i * 50}>
                    <button
                      onClick={() => toggle(f.id)}
                      className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${
                        selected.has(f.id)
                          ? "bg-brand-blue-50 dark:bg-brand-blue-950 border-brand-blue-500 shadow-sm"
                          : "bg-background border-border hover:border-brand-blue-300"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        selected.has(f.id)
                          ? "bg-brand-blue-600 border-brand-blue-600"
                          : "border-border"
                      }`}>
                        {selected.has(f.id) && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground text-lg">{f.label}</p>
                          {voterCount > 0 && (
                            <span className="text-xs text-brand-blue-600 dark:text-brand-blue-400 bg-brand-blue-50 dark:bg-brand-blue-950 px-2 py-0.5 rounded-full">
                              {voterCount} vote{voterCount > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <p className="text-base text-muted-foreground mt-0.5">{f.description}</p>
                      </div>
                    </button>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
