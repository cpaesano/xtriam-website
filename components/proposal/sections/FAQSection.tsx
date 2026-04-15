"use client";

import { useState, useEffect } from "react";
import { useViewer } from "../ViewerProvider";
import {
  addComment,
  subscribeToComments,
  type ProposalComment,
} from "@/lib/firebase-proposals";
import { SectionReveal } from "../SectionReveal";
import {
  Send,
  ArrowRight,
} from "lucide-react";

/* ── Q&A Data ── */

interface QAItem {
  id: string;
  category: string;
  question: string; // Brian's exact words
  answer: string;   // Our response
  linkToSection?: { id: string; label: string }; // Optional link to another proposal section
}

const qaItems: QAItem[] = [
  {
    id: "q1",
    category: "Pricing & Users",
    question: "How many users are included in the phase 1 for dealers, it says 250 in one place, 150 in another and 120 in another",
    answer: "Good catch. You have approximately 250 to 300 total dealer relationships. Of those, about 100 to 120 are consistently active. There is no cap on dealer accounts. We onboard your full network from day one. The pricing estimate is based on active users only, so you never pay for dealers who aren\u2019t logging in. We\u2019ve updated the proposal to remove the inconsistency.",
  },
  {
    id: "q2",
    category: "Pricing & Users",
    question: "If a dealer (let\u2019s say Suncoast) has 10 sales reps, would we have to pay $80 per month for them to have access or is it $8 covering that entire dealer?",
    answer: "The $8/month is per individual user login. If Suncoast has 10 sales reps who each log in, that dealer\u2019s total is $80/month. The number of active users per dealer will vary based on your network. You only pay for users who are actively logging in. Inactive accounts cost nothing.",
  },
  {
    id: "q3",
    category: "Data Privacy & Roles",
    question: "Can the Palm City Sales reps have their own access that we could control. I don\u2019t want them seeing cost or margin data (they get paid via sales amount). I would also want them to be able to create quotes for dealers in the dealer portal.",
    answer: "Absolutely. Your Palm City sales reps will have their own logins with a restricted role. They will NOT see your cost data (what you pay the factory) or margin data. They WILL see dealer cost (what the dealer pays you) so they can assist dealers with quotes. They CAN create quotes on behalf of their assigned dealers directly in the dealer portal. You control exactly which dealers each rep can see, matching your territory assignments. You can add, remove, or reassign reps at any time from the admin console.",
  },
  {
    id: "q4",
    category: "Data Privacy & Roles",
    question: "Please confirm our cost data are also not shown ever to the dealer. Are we able to see the selling prices they are selling our products for or is that something they would have to opt in to allow.",
    answer: "Confirmed: your cost data (what you pay the factory) is NEVER visible to dealers. This is a hard architectural rule, not just a UI toggle. Dealer users physically cannot access vendor cost data through the system.\n\nRegarding dealer selling prices: we can handle this either way based on your preference. We can make dealer retail pricing visible to you by default, or keep it private to dealers with an opt-in for those who choose to share. Whatever works best for your business. The platform supports both approaches.",
  },
  {
    id: "q5",
    category: "Agreements & Process",
    question: "Will there be some sort of written agreement covering service or slight modifications to the portal",
    answer: "Yes, we will have a formal Master Service Agreement (MSA) that covers: scope of Phase 1 deliverables, service level expectations, change request process, data ownership (your data is yours, always), termination terms and data export, and confidentiality/NDA provisions.\n\nInternally, xTriam uses a dedicated system to track improvements, bugs, tickets, and the product roadmap. You\u2019ll have visibility into what\u2019s coming and where your feedback lands.\n\nHere\u2019s how enhancements work in practice: most of the feedback and improvements you\u2019ll request are things that make sense for the platform as a whole. In our experience, these are features that benefit every client on the platform, and those are included at no additional cost as part of our ongoing efforts to improve the product. We\u2019ll help you reshape your ideas, make sure we interpret your needs correctly, and build them into the roadmap.\n\nThe only time a separate work order would apply is for something truly custom to your operation. For example, a bespoke API integration with a third-party application that requires dedicated development time and won\u2019t be used by any other client. The rule of thumb: if it\u2019s universal and makes the platform better for everyone, it\u2019s covered. If it\u2019s a one-off custom build, we\u2019ll scope it separately so there are no surprises.",
  },
  {
    id: "q6",
    category: "Platform Features",
    question: "Can the aging report portion be included in the phase 1. I want my dealer to easily be able to see what they owe us (Both deposits due and balance inv) and my sales team to see their dealers aging.",
    answer: "Yes, aging reports are now included in Phase 1. Here\u2019s what you get:\n\n\u2022 Dealer view: Outstanding deposits due, balance invoices, and payment history. Each dealer sees exactly what they owe Palm City at a glance.\n\u2022 Sales rep view: Aging summary across all their assigned dealers, so your reps can follow up on overdue accounts during their regular check-ins.\n\u2022 Admin view: Full aging report across all dealers with filtering by rep, region, and age bucket (30/60/90/120+ days).\n\nThis data comes from BisTrack as part of the integration.",
  },
  {
    id: "q7",
    category: "Platform Features",
    question: "Can open quote reports and aging reports be automatically sent to my sales team weekly as an email or text message",
    answer: "Yes. We\u2019ll set up automated digest emails that go out weekly (you pick the day, Monday morning is popular) to each sales rep with:\n\n\u2022 Open quotes summary for their dealers (quote amount, days since created, expiring soon)\n\u2022 Aging summary for their dealers (past due amounts by bucket)\n\nFor text/SMS notifications, we can do that through Twilio. We\u2019d recommend email for the detailed reports and SMS for urgent alerts only (e.g., \"Dealer X has $50K+ past due over 90 days\") to avoid notification fatigue.",
  },
  {
    id: "q8",
    category: "Platform Features",
    question: "Can you give us more detail about TWILIO and if that works thru Outlook?",
    answer: "Twilio is a cloud communications platform that handles SMS text messages directly, independent of Outlook. It sends messages from a dedicated business number (e.g., \"Palm City Dealer Portal\") for things like order status alerts, aging reminders, and quote expiration warnings. Messages are triggered automatically by the system based on rules you configure.\n\nYour team does NOT need to change anything about how they use Outlook. The portal sends its own notifications independently via SendGrid (professional email delivery, owned by Twilio) and Twilio SMS (text messages). Both are included in Phase 1.\n\nLooking ahead, SendGrid also powers email marketing campaigns: outreach to existing clients, prospecting to potential clients, drip sequences, and more. That\u2019s not part of the initial phases, but when you\u2019re ready to use the platform for marketing outreach in a future phase, the infrastructure is already there. No additional setup required since it\u2019s built into the same Twilio/SendGrid stack.",
  },
  {
    id: "q9",
    category: "Agreements & Process",
    question: "Are we going to have to submit formal change requests or is text email conversation ok",
    answer: "A one-off text message or email is fine if you need to reach us directly. That said, we highly encourage using the built-in support system on the platform. Here\u2019s why:\n\nThe platform includes a full feedback and support system. Your team will have access to:\n\n\u2022 A ticket system to report bugs, request changes, and track their status\n\u2022 A feature request portal to submit new ideas and improvements directly from the platform\n\u2022 AI-powered support that can answer common questions, walk your team through features, and document requests on your behalf\n\nWhen feedback goes through the platform, it\u2019s documented and visible to the entire xTriam team. That means if Carlos is in a meeting or doing a training, the rest of the team still has full visibility and can follow up. Nothing falls through the cracks. A text to Carlos works in a pinch, but the platform ensures every request is tracked, prioritized, and never lost.",
  },
  {
    id: "q10",
    category: "Support & Uptime",
    question: "Is there a written agreement that system uptime will be no less than X, do you have any metrics of what you have seen in the past",
    answer: "The system runs on Google Cloud Platform / Firebase, which provides a 99.95% uptime SLA on their infrastructure. Across our production applications (InvoiceTicket, BluFound, Volunteers for Seniors), we\u2019ve maintained effectively 99.9%+ uptime. Downtime has been limited to planned maintenance windows scheduled off-hours with advance notice.\n\nWe will include a 99.5% uptime commitment in the MSA, which is the industry standard for B2B platforms. In practice, we consistently exceed that. We also set up automated monitoring and alerting, and we\u2019ll provide a status page so your team can check system status anytime.",
  },
  {
    id: "q11",
    category: "Future Vision",
    question: "For phase 2, we would want to integrate the drawing phase into the system. I would like to explore taking it a step further... uploading a photo of the elevation or entry way and the system would give a color rendering of the door unit... search Google Maps, or Zillow... could also be added to our website so a potential customer could enter their address and configure what they wanted...",
    answer: "This is exciting. These are exactly the types of capabilities that AI is opening up, and the technology is advancing fast. By the time we get to Phase 2, it will be even more mature than it is today. All of this is completely within our capabilities, and our team is genuinely excited to build it.\n\nHere\u2019s how we see it taking shape:\n\n\u2022 Drawing phase integration (Phase 2): Dealers upload shop drawings or elevation sketches. AI extracts dimensions and specs, then populates the configurator for real-time pricing.\n\n\u2022 Color rendering on uploaded photos (Phase 2-3): Dealer uploads a photo of the elevation or entryway. AI generates a rendering showing your products in that opening with different finish options.\n\n\u2022 Google Maps/Zillow street view lookup (Phase 3): Customer enters their address, the system pulls a street view or listing photo, and overlays your products onto the actual home.\n\n\u2022 Website lead generation (Phase 3-4): A homeowner visits your website, sees their home with your products rendered on it, configures what they want with real-time pricing, and submits as a lead routed to the nearest dealer.\n\nWe\u2019ll assess the specifics together when the time comes for each phase. What we can tell you now is that our team has the technical depth to deliver this, and we\u2019re looking forward to it.",
  },
  {
    id: "q12",
    category: "Data & Integration",
    question: "On day 1, would the system be able to pull in the existing quotes, sales orders and relevant data from bistrack so there is minimal data entry by my team",
    answer: "That\u2019s the goal, and it\u2019s one of the areas where our team puts the most effort during implementation. We want you, John, and the rest of the Palm City team focused on sharing knowledge about your processes and what you need. The data entry and migration work is on us.\n\nFor Phase 1 launch, we plan to pull in from BisTrack:\n\n\u2022 Existing active quotes (so dealers see their current pipeline immediately)\n\u2022 Open sales orders and their status\n\u2022 Dealer account information (company, contacts, terms, discount tiers)\n\u2022 Outstanding invoices / aging data\n\nWe haven\u2019t seen the BisTrack API yet, so we\u2019ll need access to it or the database structure early in the project to map the data fields. We\u2019re confident we\u2019ll work it out. Our expectation and motivation is that your team and your dealers have as much of their existing information available from day one as possible, with minimal manual data entry.\n\nWe\u2019ll assess this in the first two weeks and give you a clear picture of what migrates automatically vs. what might need a one-time manual import. Taking those nitty-gritty tasks off your plate is exactly what the implementation phase is for.",
  },
  {
    id: "q13",
    category: "Mobile & Access",
    question: "Will the web app be able to be converted to have a Mobile app",
    answer: "The portal is being built as a responsive web application, which means it works on any phone or tablet through the browser. No app store download needed. Your dealers can add it to their home screen and it behaves like a native app (this is called a Progressive Web App, or PWA).\n\nFor a B2B portal like this, a PWA gives you 95% of the native app experience without the cost and delays of App Store review, updates, and dual-platform maintenance. If down the road push notifications or deep offline access become critical, we can wrap it as a native app relatively quickly since the codebase is the same.",
  },
  {
    id: "q14",
    category: "Support & Uptime",
    question: "What happens after the initial 30 day window for service issues",
    linkToSection: { id: "support", label: "View Ongoing Support details" },
    answer: "The initial 30-day window after launch covers bug fixes, configuration adjustments, training reinforcement, and stabilization at no additional cost. That\u2019s our warranty period to make sure everything is solid.\n\nAfter that, ongoing support is covered under your monthly platform subscription with three tiers: 24/7 AI-assisted support, email and ticket support during business hours, and scheduled live human support. We\u2019ve added a dedicated Ongoing Support section to this proposal with full details. Click below to review it.\n\nMajor new features (like the Phase 2 items we discussed) would be scoped as separate engagements.",
  },
  {
    id: "q15",
    category: "Agreements & Process",
    question: "Do we get a written test plan that we need to approve for each major step along the process?",
    answer: "Yes. For each major milestone, we\u2019ll provide:\n\n1. Written test plan outlining what\u2019s being tested, including features, user scenarios, and edge cases\n2. Demo/walkthrough where we show you the working feature in a staging environment\n3. Sign-off period where your team tests it hands-on\n4. Formal approval before we move to the next milestone\n\nWe won\u2019t move forward on the next phase until you\u2019ve signed off on the current one. This protects both of us. You know exactly what you\u2019re getting, and we know we\u2019re building the right thing.",
  },
];

/* ── Shared comment helpers (reused from CommentThread) ── */

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function Avatar({ initials, role, size = "sm" }: { initials: string; role: string; size?: "sm" | "md" }) {
  const colors: Record<string, string> = {
    owner: "bg-brand-blue-600",
    contributor: "bg-purple-600",
    client: "bg-brand-orange-500",
  };
  const sizeClass = size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  return (
    <div className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white shrink-0 ${colors[role] || "bg-brand-orange-500"}`}>
      {initials}
    </div>
  );
}

/* ── Inline Chat Thread ── */

function InlineChatThread({ sectionId }: { sectionId: string }) {
  const viewer = useViewer();
  const [comments, setComments] = useState<ProposalComment[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewer) return;
    const unsub = subscribeToComments(viewer.proposalCode, sectionId, setComments);
    return () => unsub();
  }, [viewer, sectionId]);

  useEffect(() => {
    if (comments.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [comments.length]);

  async function handleSend() {
    if (!text.trim() || !viewer || sending) return;
    setSending(true);
    try {
      await addComment({
        proposalCode: viewer.proposalCode,
        sectionId,
        viewerId: viewer.viewerId,
        viewerName: viewer.viewerName,
        viewerAvatar: viewer.viewerAvatar,
        viewerRole: viewer.viewerRole,
        text: text.trim(),
      });
      setText("");
    } finally {
      setSending(false);
    }
  }

  if (!viewer) return null;

  const isOwnMessage = (c: ProposalComment) => c.viewerId === viewer.viewerId;

  return (
    <div className="border-t border-border bg-muted/20">
      {/* Messages */}
      {comments.length > 0 && (
        <div className="px-5 py-3 space-y-2 max-h-80 overflow-y-auto">
          {comments.map((c) => {
            const own = isOwnMessage(c);
            const isClient = c.viewerRole === "client";
            return (
              <div key={c.id} className={`flex items-center gap-2 ${own ? "flex-row-reverse" : ""}`}>
                <Avatar initials={c.viewerAvatar} role={c.viewerRole} size="sm" />
                <div className={`rounded-2xl px-4 py-1.5 ${
                  own
                    ? "bg-brand-blue-600 text-white rounded-br-md"
                    : isClient
                      ? "bg-brand-orange-100 dark:bg-brand-orange-950/30 text-foreground rounded-bl-md"
                      : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  <p className="text-sm leading-snug whitespace-pre-wrap">{c.text}</p>
                </div>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">{c.viewerName} &middot; {timeAgo(c.createdAt)}</span>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Compose */}
      <div className="px-5 py-3 border-t border-border/50">
        <div className="flex items-end gap-2">
          <Avatar initials={viewer.viewerAvatar} role={viewer.viewerRole} size="sm" />
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || sending}
            className="p-2.5 rounded-full bg-brand-blue-600 text-white hover:bg-brand-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Single Q&A Card ── */

function QACard({ item }: { item: QAItem }) {
  const sectionId = `faq-${item.id}`;

  return (
    <div className="bg-muted/30 border border-border rounded-2xl overflow-hidden">
      {/* Brian's question */}
      <div className="px-6 py-5 bg-brand-orange-50 dark:bg-brand-orange-950/20 border-b border-brand-orange-200 dark:border-brand-orange-900/30">
        <div className="flex items-start gap-3">
          <Avatar initials="BO" role="client" size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-sm text-foreground">Brian O&apos;Neill</span>
              <span className="text-xs text-muted-foreground bg-brand-orange-100 dark:bg-brand-orange-900/30 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
            </div>
            <p className="text-foreground text-base leading-relaxed italic">
              &ldquo;{item.question}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Our answer */}
      <div className="px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-blue-600 flex items-center justify-center text-sm font-bold text-white shrink-0">xT</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-sm text-foreground">xTriam Team</span>
            </div>
            <p className="text-foreground text-base leading-relaxed whitespace-pre-line">
              {item.answer}
            </p>
            {item.linkToSection && (
              <button
                onClick={() => {
                  const el = document.getElementById(`section-${item.linkToSection!.id}`) || document.getElementById(item.linkToSection!.id);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-blue-50 dark:bg-brand-blue-950/50 hover:bg-brand-blue-100 dark:hover:bg-brand-blue-900/50 border border-brand-blue-200 dark:border-brand-blue-800 text-brand-blue-600 dark:text-brand-blue-400 text-sm font-medium transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                {item.linkToSection.label}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Inline chat thread */}
      <InlineChatThread sectionId={sectionId} />
    </div>
  );
}

/* ── User-Submitted Question Card (renders like a regular QACard) ── */

function UserQuestionCard({ question }: { question: ProposalComment }) {
  const sectionId = `faq-user-${question.id}`;

  return (
    <div className="bg-muted/30 border border-border rounded-2xl overflow-hidden">
      {/* The user's question */}
      <div className="px-6 py-5 bg-brand-orange-50 dark:bg-brand-orange-950/20 border-b border-brand-orange-200 dark:border-brand-orange-900/30">
        <div className="flex items-start gap-3">
          <Avatar initials={question.viewerAvatar} role={question.viewerRole} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-sm text-foreground">{question.viewerName}</span>
              <span className="text-xs text-muted-foreground">{timeAgo(question.createdAt)}</span>
            </div>
            <p className="text-foreground text-base leading-relaxed italic">
              &ldquo;{question.text}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Response thread */}
      <InlineChatThread sectionId={sectionId} />
    </div>
  );
}

/* ── User-Submitted Questions List ── */

function UserSubmittedQuestions() {
  const viewer = useViewer();
  const [questions, setQuestions] = useState<ProposalComment[]>([]);

  useEffect(() => {
    if (!viewer) return;
    const unsub = subscribeToComments(viewer.proposalCode, "faq-new-questions", setQuestions);
    return () => unsub();
  }, [viewer]);

  if (!viewer || questions.length === 0) return null;

  return (
    <>
      {questions.map((q) => (
        <UserQuestionCard key={q.id} question={q} />
      ))}
    </>
  );
}

/* ── New Question Form ── */

function NewQuestionForm() {
  const viewer = useViewer();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  async function handleSubmit() {
    if (!text.trim() || !viewer || sending) return;
    setSending(true);
    try {
      await addComment({
        proposalCode: viewer.proposalCode,
        sectionId: "faq-new-questions",
        viewerId: viewer.viewerId,
        viewerName: viewer.viewerName,
        viewerAvatar: viewer.viewerAvatar,
        viewerRole: viewer.viewerRole,
        text: text.trim(),
      });
      setText("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setSending(false);
    }
  }

  if (!viewer) return null;

  return (
    <div className="bg-muted/30 border-2 border-dashed border-brand-blue-300 dark:border-brand-blue-700 rounded-2xl overflow-hidden">
      <div className="px-6 py-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Have another question?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Submit a new question and the xTriam team will respond directly.
        </p>
        <div className="flex items-start gap-3">
          <Avatar initials={viewer.viewerAvatar} role={viewer.viewerRole} size="md" />
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
              placeholder="Type your question here..."
              rows={3}
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">
                {submitted ? "Question submitted. We\u2019ll get back to you." : "Press Enter to submit"}
              </span>
              <button
                onClick={handleSubmit}
                disabled={!text.trim() || sending}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-brand-blue-600 text-white text-sm font-medium hover:bg-brand-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ Section ── */

import React from "react";

export function FAQSection() {
  return (
    <section id="faq" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-blue-600 dark:text-brand-blue-400 font-bold tracking-widest uppercase text-base mb-3">
              Questions &amp; Answers
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Everything you asked, answered
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Your questions from Phase 1 review, with direct answers from the xTriam team.
              Use the chat below each Q&amp;A to continue the conversation.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {qaItems.map((item, i) => (
            <SectionReveal key={item.id} delay={i * 50}>
              <QACard item={item} />
            </SectionReveal>
          ))}

          {/* User-submitted questions (each becomes its own card) */}
          <UserSubmittedQuestions />

          {/* New question form */}
          <SectionReveal delay={qaItems.length * 50}>
            <NewQuestionForm />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
