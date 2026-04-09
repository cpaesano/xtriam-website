"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Lock } from "lucide-react";

export function PasscodeForm({ code }: { code: string }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/proposal/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, passcode }),
      });

      if (res.ok) {
        router.push(`/proposal/${code}/view`);
      } else {
        const data = await res.json();
        setError(data.error || "Invalid access code");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-brand-blue-50 dark:bg-brand-blue-950 flex items-center justify-center">
          <Lock className="w-8 h-8 text-brand-blue-600" />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Enter your access code</h1>
        <p className="mt-2 text-muted-foreground">
          This proposal is protected. Please enter the code provided to you.
        </p>
      </div>

      <div>
        <Input
          type="text"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Access code"
          error={!!error}
          autoFocus
          className="text-center text-lg tracking-wider"
        />
        {error && (
          <p className="mt-2 text-sm text-error text-center">{error}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!passcode || loading}
        className="w-full"
        size="lg"
      >
        {loading ? "Verifying..." : "View Proposal"}
      </Button>
    </form>
  );
}
