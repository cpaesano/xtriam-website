"use client";

import { useRef, useState, useEffect } from "react";

interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  length?: number;
}

export function PinInput({
  value,
  onChange,
  disabled = false,
  error,
  length = 6,
}: PinInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync digits with value prop
  useEffect(() => {
    const newDigits = value.split("").slice(0, length);
    while (newDigits.length < length) {
      newDigits.push("");
    }
    setDigits(newDigits);
  }, [value, length]);

  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    const digit = newValue.replace(/\D/g, "").slice(-1);

    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    onChange(newDigits.join(""));

    // Move to next input if digit entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    const pastedDigits = pasted.split("").slice(0, length);

    const newDigits = [...digits];
    pastedDigits.forEach((digit, i) => {
      newDigits[i] = digit;
    });
    setDigits(newDigits);
    onChange(newDigits.join(""));

    // Focus last filled input or first empty
    const lastIndex = Math.min(pastedDigits.length, length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div>
      <div className="flex justify-center gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`w-12 h-14 text-center text-2xl font-bold border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${error ? "border-red-500" : "border-gray-300"}`}
            autoComplete="one-time-code"
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}
