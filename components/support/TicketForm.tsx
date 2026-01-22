"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, AlertCircle, Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui";

interface TicketFormProps {
  onSuccess?: (caseId: string) => void;
}

interface FilePreview {
  file: File;
  preview: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"];

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

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: FilePreview[] = [];
    const errors: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Only images allowed.`);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File too large. Maximum size is 5MB.`);
        return;
      }

      // Create preview
      const preview = URL.createObjectURL(file);
      newFiles.push({ file, preview });
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

  async function uploadFiles(caseId: string): Promise<boolean> {
    if (files.length === 0) return true;

    setUploadingFiles(true);

    try {
      for (const { file } of files) {
        // Convert file to base64
        const base64 = await fileToBase64(file);

        const response = await fetch("/api/support/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            caseId,
            fileName: file.name,
            base64Data: base64,
            contentType: file.type,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          console.error(`Failed to upload ${file.name}:`, data.error);
          // Continue uploading other files even if one fails
        }
      }

      return true;
    } catch (err) {
      console.error("File upload error:", err);
      return false;
    } finally {
      setUploadingFiles(false);
    }
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data URL prefix (e.g., "data:image/png;base64,")
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
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
        // Upload any attached files
        if (files.length > 0) {
          await uploadFiles(data.caseId);
        }

        // Clean up file previews
        files.forEach(({ preview }) => URL.revokeObjectURL(preview));

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="whitespace-pre-wrap">{error}</span>
          </div>
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
          placeholder="Brief description of your issue or request"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20"
          disabled={isSubmitting}
        />
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
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20"
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
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20"
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
          placeholder={
            type === "Issue"
              ? "Please describe the issue in detail. Include any error messages, steps to reproduce, and what you expected to happen."
              : type === "Feature Request"
              ? "Please describe the feature you'd like to see. Include the problem it would solve and how you envision it working."
              : "What would you like to know? Please provide as much context as possible."
          }
          rows={6}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20 resize-none"
          disabled={isSubmitting}
        />
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
              PNG, JPG, GIF up to 5MB each
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={isSubmitting}
          />

          {/* File Previews */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {files.map((filePreview, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border border-border bg-gray-50"
                >
                  <img
                    src={filePreview.preview}
                    alt={filePreview.file.name}
                    className="w-full h-24 object-cover"
                  />
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
  );
}
