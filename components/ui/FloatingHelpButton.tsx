"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function FloatingHelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      {/* Help Menu (appears above button when open) */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-72 mb-2">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Need Help?</h3>
            <p className="text-base text-gray-500">We&apos;re here to assist you</p>
          </div>

          <div className="space-y-3">
            {/* Call Support */}
            <a
              href="tel:+1-305-204-9694"
              className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-3xl flex-shrink-0">📞</span>
              <div>
                <p className="text-lg font-semibold text-green-700">Call Us</p>
                <p className="text-base text-green-600">(305) 204-9694</p>
              </div>
            </a>

            {/* Email Support */}
            <a
              href="mailto:sales@xtriam.com"
              className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-3xl flex-shrink-0">✉️</span>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-blue-700">Email Us</p>
                <p className="text-sm text-blue-600 truncate">sales@xtriam.com</p>
              </div>
            </a>

            {/* Book a Demo */}
            <Link
              href="/book-a-demo"
              className="flex items-center gap-4 p-4 bg-brand-orange-50 border border-brand-orange-200 rounded-xl hover:bg-brand-orange-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-3xl flex-shrink-0">📅</span>
              <div>
                <p className="text-lg font-semibold text-brand-orange-700">Book a Demo</p>
                <p className="text-sm text-brand-orange-600">See <strong>bpmPro</strong> in action</p>
              </div>
            </Link>

            {/* Contact Form */}
            <Link
              href="/contact"
              className="flex items-center gap-4 p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-3xl flex-shrink-0">💬</span>
              <div>
                <p className="text-lg font-semibold text-purple-700">Send a Message</p>
                <p className="text-sm text-purple-600">Contact form</p>
              </div>
            </Link>

            {/* Help Center */}
            <Link
              href="/help"
              className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-3xl flex-shrink-0">❓</span>
              <div>
                <p className="text-lg font-semibold text-gray-700">Help Center</p>
                <p className="text-sm text-gray-600">FAQs & Resources</p>
              </div>
            </Link>
          </div>

          {/* Close hint */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Tap anywhere to close
          </p>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-brand-blue-600 hover:bg-brand-blue-700"
        }`}
        aria-label={isOpen ? "Close help menu" : "Get help"}
      >
        <span className="text-3xl text-white">{isOpen ? "✕" : "?"}</span>
      </button>

      {/* Pulse Animation */}
      {!isOpen && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-brand-orange-500 rounded-full animate-pulse" />
      )}
    </div>
  );
}
