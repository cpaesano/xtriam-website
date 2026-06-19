"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, AlertCircle, Upload, X, Image as ImageIcon, FileText } from "lucide-react";
import { Button, ProcessingOverlay } from "@/components/ui";

interface TicketFormProps {
  onSuccess?: (caseId: string) => void;
}

interface FilePreview {
  file: File;
  preview: string;
  renderable: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// Validate by extension (HEIC often has no/unreliable MIME type in browsers).
const ALLOWED_EXT = ["png", "jpg", "jpeg", "gif", "webp", "heic", "heif", "pdf"];
const RENDERABLE_EXT = ["png", "jpg", "jpeg", "gif", "webp"]; // browsers can <img> these
const ALLOWED_LABEL = "PNG, JPG, GIF, WebP, HEIC, or PDF";
const MIME_BY_EXT: Record<string, string> = {
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif",
  webp: "image/webp", heic: "image/heic", heif: "image/heif", pdf: "application/pdf",
};
function extOf(name: string): string {
  return (name.split(".").pop() || "").toLowerCase();
}
function contentTypeFor(file: File): string {
  return file.type || MIME_BY_EXT[extOf(file.name)] || "application/octet-stream";
}

export function TicketForm({ onSuccess }: TicketFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<"Issue" | "Feature Request" | "Question">("Issue");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Set once the ticket is created, so we can link to it even if an attachment
  // upload subsequently fails.
  const [createdCaseId, setCreatedCaseId] = useState<string | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: FilePreview[] = [];
    const errors: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      const ext = extOf(file.name);
      // Check file type (by extension)
      if (!ALLOWED_EXT.includes(ext)) {
        errors.push(`${file.name}: Invalid file type. Allowed: ${ALLOWED_LABEL}.`);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File too large. Maximum size is 10MB.`);
        return;
      }

      // Only browser-renderable images get an <img> preview; others show a tile.
      const renderable = RENDERABLE_EXT.includes(ext);
      const preview = renderable ? URL.createObjectURL(file) : "";
      newFiles.push({ file, preview, renderable });
    });

    if (errors.length > 0) {
      setError(errors.join("\n"));
    }

    setFiles((prev) => [...prev, ...newFiles]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeFile(index: number) {
    setFiles((prev) => {
      const newFiles = [...prev];
      // Revoke the object URL to free memory
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  }

  /**
   * Upload each attached file directly to Cloud Storage via a signed URL:
   *   1. ask our API for a signed upload URL
   *   2. PUT the file bytes straight to Storage (no serverless body limit)
   *   3. tell our API to record the attachment on the ticket
   * Returns true only if every file succeeded; surfaces failures to the user.
   */
  async function uploadFiles(caseId: string): Promise<boolean> {
    if (files.length === 0) return true;

    setUploadingFiles(true);
    const failed: string[] = [];

    try {
      for (const { file } of files) {
        const ct = contentTypeFor(file);
        try {
          // 1. Get a signed upload URL
          const urlRes = await fetch("/api/support/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              caseId,
              fileName: file.name,
              contentType: ct,
              fileSize: file.size,
            }),
          });
          const urlData = await urlRes.json();
          if (!urlRes.ok || !urlData.success) {
            console.error(`Upload URL failed for ${file.name}:`, urlData.error);
            failed.push(file.name);
            continue;
          }

          // 2. Upload the bytes directly to Cloud Storage
          const putRes = await fetch(urlData.uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": ct },
            body: file,
          });
          if (!putRes.ok) {
            console.error(`Storage PUT failed for ${file.name}:`, putRes.status);
            failed.push(file.name);
            continue;
          }

          // 3. Record the attachment on the ticket
          const doneRes = await fetch("/api/support/upload/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              caseId,
              id: urlData.id,
              fileName: file.name,
              path: urlData.path,
              contentType: ct,
            }),
          });
          const doneData = await doneRes.json();
          if (!doneRes.ok || !doneData.success) {
            console.error(`Recording attachment failed for ${file.name}:`, doneData.error);
            failed.push(file.name);
          }
        } catch (err) {
          console.error(`File upload error for ${file.name}:`, err);
          failed.push(file.name);
        }
      }

      if (failed.length > 0) {
        setError(
          `Your ticket was created, but these attachments did not upload: ${failed.join(
            ", "
          )}. You can add them by replying to the ticket.`
        );
        return false;
      }
      return true;
    } finally {
      setUploadingFiles(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!subject.trim() || !description.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Create the ticket
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, subject, description, priority }),
      });

      const data = await response.json();

      if (data.success) {
        setCreatedCaseId(data.caseId);

        // Upload any attached files (directly to Cloud Storage)
        const uploadsOk =
          files.length > 0 ? await uploadFiles(data.caseId) : true;

        // Clean up file previews
        files.forEach(({ preview }) => URL.revokeObjectURL(preview));

        if (!uploadsOk) {
          // Ticket was created but an attachment failed. Keep the user here so
          // they see the error + the link to their ticket (rendered below)
          // rather than silently redirecting.
          return;
        }

        if (onSuccess) {
          onSuccess(data.caseId);
        } else {
          router.push(`/support/tickets/${data.caseId}`);
        }
      } else {
        setError(data.error || "Failed to create ticket");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  const isSubmitting = loading || uploadingFiles;

  return (
    <>
      <ProcessingOverlay
        show={isSubmitting}
        message={uploadingFiles ? "Uploading attachments..." : "Submitting your ticket..."}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="whitespace-pre-wrap">{error}</span>
          </div>
          {createdCaseId && (
            <button
              type="button"
              onClick={() => router.push(`/support/tickets/${createdCaseId}`)}
              className="mt-3 text-sm font-medium text-brand-blue-600 underline hover:text-brand-blue-700"
            >
              View your ticket
            </button>
          )}
        </div>
      )}

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20"
          disabled={isSubmitting}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          A brief description of your issue or request.
        </p>
      </div>

      {/* Type and Priority - Same Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Type Selection */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as "Issue" | "Feature Request" | "Question")}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20"
            disabled={isSubmitting}
          >
            <option value="Issue">Issue</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Question">Question</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20"
            disabled={isSubmitting}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20 resize-none"
          disabled={isSubmitting}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {type === "Issue"
            ? "Describe the issue in detail. Include any error messages, steps to reproduce, and what you expected to happen."
            : type === "Feature Request"
            ? "Describe the feature you'd like to see. Include the problem it would solve and how you envision it working."
            : "What would you like to know? Please provide as much context as possible."}
        </p>
      </div>

      {/* Screenshot Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Screenshots (optional)
        </label>
        <div className="space-y-3">
          {/* Upload Area */}
          <div
            onClick={() => !isSubmitting && fileInputRef.current?.click()}
            className={`
              border-2 border-dashed border-border rounded-lg p-6
              flex flex-col items-center justify-center gap-2
              cursor-pointer hover:border-brand-blue-400 hover:bg-brand-blue-50/50
              transition-colors
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-muted-foreground text-center">
              Click to upload screenshots
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, GIF, WebP, HEIC, or PDF up to 10MB each
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/heic,image/heif,application/pdf,.heic,.heif,.pdf"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={isSubmitting}
          />

          {/* File Previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {files.map((filePreview, index) => (
                <div
                  key={index}
                  className="relative group w-32 flex-shrink-0 rounded-lg overflow-hidden border border-border bg-gray-50"
                >
                  {filePreview.renderable ? (
                    <img
                      src={filePreview.preview}
                      alt={filePreview.file.name}
                      className="w-full h-32 object-contain bg-gray-100"
                    />
                  ) : (
                    <div className="flex h-32 w-full flex-col items-center justify-center bg-gray-100 px-2 text-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                      <span className="mt-1 text-[10px] font-medium uppercase text-gray-500">
                        {extOf(filePreview.file.name)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                    <p className="text-xs text-white truncate">
                      {filePreview.file.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {uploadingFiles ? "Uploading files..." : "Creating..."}
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Ticket
            </>
          )}
        </Button>
      </div>
      </form>
    </>
  );
}
