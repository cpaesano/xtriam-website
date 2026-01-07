"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

/**
 * Format phone number as (XXX) XXX-XXXX
 */
function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");

  // Limit to 10 digits
  const limited = digits.slice(0, 10);

  // Format based on length
  if (limited.length === 0) return "";
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6)
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
}

/**
 * Get raw digits from formatted phone
 */
function getRawDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function PhoneInput({
  value,
  onChange,
  disabled = false,
  error,
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  // Sync display value with prop value
  useEffect(() => {
    setDisplayValue(formatPhoneNumber(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setDisplayValue(formatted);
    onChange(getRawDigits(formatted));
  };

  return (
    <div>
      <Input
        type="tel"
        placeholder="(305) 555-1234"
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        className={`text-lg ${error ? "border-red-500" : ""}`}
        autoComplete="tel"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
