"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneInput } from "./PhoneInput";
import { PinInput } from "./PinInput";
import { Button } from "@/components/ui";

type Step = "phone" | "pin";

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/send-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send verification code");
        return;
      }

      setStep("pin");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (pin.length !== 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid verification code");
        return;
      }

      // Redirect to support portal
      router.push(data.redirect || "/support");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendPin = async () => {
    setPin("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/send-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to resend code");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhone = () => {
    setStep("phone");
    setPin("");
    setError("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {step === "phone" ? (
        <form onSubmit={handleSendPin} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Customer Support
            </h2>
            <p className="text-gray-600">
              Enter your phone number to sign in. We&apos;ll send you a
              verification code.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              disabled={loading}
              error={error}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading || phone.length !== 10}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            Your phone number must be registered with your xTriam account.
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyPin} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Enter Verification Code
            </h2>
            <p className="text-gray-600">
              We sent a 6-digit code to{" "}
              <span className="font-medium">
                ({phone.slice(0, 3)}) {phone.slice(3, 6)}-{phone.slice(6)}
              </span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Verification Code
            </label>
            <PinInput
              value={pin}
              onChange={setPin}
              disabled={loading}
              error={error}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading || pin.length !== 6}
          >
            {loading ? "Verifying..." : "Verify & Sign In"}
          </Button>

          <div className="flex flex-col items-center gap-2 text-sm">
            <button
              type="button"
              onClick={handleResendPin}
              disabled={loading}
              className="text-brand-blue-600 hover:text-brand-blue-700 font-medium disabled:opacity-50"
            >
              Resend Code
            </button>
            <button
              type="button"
              onClick={handleChangePhone}
              disabled={loading}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              Use Different Phone Number
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
