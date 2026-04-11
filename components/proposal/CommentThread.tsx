"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useViewer } from "./ViewerProvider";
import {
  addComment,
  subscribeToComments,
  toggleLike,
  type ProposalComment,
} from "@/lib/firebase-proposals";
import { MessageCircle, X, Heart, Send, Reply } from "lucide-react";

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

function Avatar({ initials, role }: { initials: string; role: string }) {
  const colors = {
    owner: "bg-brand-blue-600",
    contributor: "bg-purple-600",
    client: "bg-brand-orange-500",
  };
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
        colors[role as keyof typeof colors] || "bg-brand-orange-500"
      }`}
    >
      {initials}
    </div>
  );
}

function CommentItem({
  comment,
  viewerId,
  onReply,
}: {
  comment: ProposalComment;
  viewerId: string;
  onReply: (id: string, name: string) => void;
}) {
  const liked = comment.likes.includes(viewerId);

  return (
    <div className={`flex gap-3 ${comment.parentId ? "ml-10" : ""}`}>
      <Avatar initials={comment.viewerAvatar} role={comment.viewerRole} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm text-foreground">
            {comment.viewerName}
          </span>
          <span className="text-sm text-muted-foreground">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap break-words">
          {comment.text}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => toggleLike(comment.id, viewerId, liked)}
            className={`flex items-center gap-1 text-xs transition-colors ${
              liked
                ? "text-red-500"
                : "text-muted-foreground hover:text-red-500"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
            {comment.likes.length > 0 && comment.likes.length}
          </button>
          {!comment.parentId && (
            <button
              onClick={() => onReply(comment.id, comment.viewerName)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Reply className="w-3.5 h-3.5" /> Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CommentButton({ sectionId }: { sectionId: string }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<ProposalComment[]>([]);
  const viewer = useViewer();

  useEffect(() => {
    if (!viewer) return;
    const unsub = subscribeToComments(viewer.proposalCode, sectionId, setComments);
    return () => unsub();
  }, [viewer, sectionId]);

  const handleClose = useCallback(() => setOpen(false), []);

  const count = comments.length;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-sm font-medium shadow-lg shadow-brand-blue-600/25 hover:shadow-brand-blue-600/40 transition-all"
      >
        <MessageCircle className="w-5 h-5" />
        {count > 0 ? `${count} comment${count > 1 ? "s" : ""}` : "Leave a comment"}
      </button>

      {open && createPortal(
        <CommentPanel
          sectionId={sectionId}
          comments={comments}
          onClose={handleClose}
        />,
        document.body
      )}
    </>
  );
}

function CommentPanel({
  sectionId,
  comments,
  onClose,
}: {
  sectionId: string;
  comments: ProposalComment[];
  onClose: () => void;
}) {
  const viewer = useViewer();
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [sending, setSending] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Group comments: top-level + replies
  const topLevel = comments.filter((c) => !c.parentId);
  const replies = comments.filter((c) => c.parentId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments.length]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);

    // Push history state so browser back closes panel instead of navigating away
    window.history.pushState({ commentPanel: true }, "");
    function handlePopState() {
      onClose();
    }
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose]);

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
        parentId: replyTo?.id,
      });
      setText("");
      setReplyTo(null);
    } finally {
      setSending(false);
    }
  }

  function handleReply(id: string, name: string) {
    setReplyTo({ id, name });
    inputRef.current?.focus();
  }

  if (!viewer) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-background border-l border-border shadow-2xl flex flex-col animate-[slideIn_0.2s_ease-out]"
        style={{
          // @ts-expect-error CSS custom animation
          "--tw-enter-translate-x": "100%",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-brand-blue-600" />
            <span className="font-medium text-foreground text-sm">Discussion</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-red-100 dark:hover:bg-red-950 text-muted-foreground hover:text-red-600 transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {comments.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No comments yet.</p>
              <p className="text-xs mt-1">Start the conversation.</p>
            </div>
          )}

          {topLevel.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <CommentItem
                comment={comment}
                viewerId={viewer.viewerId}
                onReply={handleReply}
              />
              {replies
                .filter((r) => r.parentId === comment.id)
                .map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    viewerId={viewer.viewerId}
                    onReply={handleReply}
                  />
                ))}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border px-4 py-3">
          {replyTo && (
            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
              <Reply className="w-3 h-3" />
              Replying to {replyTo.name}
              <button
                onClick={() => setReplyTo(null)}
                className="ml-auto hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <div className="flex items-end gap-2">
            <Avatar initials={viewer.viewerAvatar} role={viewer.viewerRole} />
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Write a comment..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!text.trim() || sending}
              className="p-2 rounded-xl bg-brand-blue-600 text-white hover:bg-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
