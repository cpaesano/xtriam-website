"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface UnsubscribeState {
  loading: boolean;
  verified: boolean;
  processed: boolean;
  error: string | null;
  email: string | null;
  firstName: string | null;
  alreadyUnsubscribed: boolean;
}

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState<UnsubscribeState>({
    loading: true,
    verified: false,
    processed: false,
    error: null,
    email: null,
    firstName: null,
    alreadyUnsubscribed: false,
  });

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Invalid unsubscribe link. Please check your email and try again.",
      }));
      return;
    }

    verifyToken(token);
  }, [token]);

  async function verifyToken(token: string) {
    try {
      const response = await fetch(`/api/email/unsubscribe?token=${encodeURIComponent(token)}`);
      const data = await response.json();

      if (data.valid) {
        setState((prev) => ({
          ...prev,
          loading: false,
          verified: true,
          email: data.email,
          firstName: data.firstName,
          alreadyUnsubscribed: data.alreadyUnsubscribed,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: data.error || "Invalid unsubscribe link.",
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to verify unsubscribe link. Please try again later.",
      }));
    }
  }

  async function handleUnsubscribe() {
    if (!token) return;

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch("/api/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          processed: true,
          alreadyUnsubscribed: data.alreadyUnsubscribed || false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: data.error || "Failed to unsubscribe. Please try again.",
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to process request. Please try again later.",
      }));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">xTriam</h1>
          <p className="mt-2 text-sm text-gray-600">Email Preferences</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {state.loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Processing...</p>
            </div>
          ) : state.error ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">Error</h2>
              <p className="mt-2 text-sm text-gray-600">{state.error}</p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Return to xTriam.com
                </Link>
              </div>
            </div>
          ) : state.processed ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">
                {state.alreadyUnsubscribed
                  ? "Already Unsubscribed"
                  : "Successfully Unsubscribed"}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {state.email} has been removed from our marketing email list.
              </p>
              <p className="mt-4 text-xs text-gray-500">
                You may still receive transactional emails related to your account.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Return to xTriam.com
                </Link>
              </div>
            </div>
          ) : state.verified && state.alreadyUnsubscribed ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">
                Already Unsubscribed
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {state.email} is already unsubscribed from our marketing emails.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Return to xTriam.com
                </Link>
              </div>
            </div>
          ) : state.verified ? (
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Unsubscribe from Marketing Emails
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {state.firstName ? `Hi ${state.firstName}, you` : "You"} are about to
                unsubscribe <strong>{state.email}</strong> from xTriam marketing emails.
              </p>
              <div className="mt-6 space-y-4">
                <button
                  onClick={handleUnsubscribe}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Unsubscribe
                </button>
                <Link
                  href="/"
                  className="block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                You will no longer receive marketing emails from xTriam.
                Transactional emails may still be sent.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          xTriam | 5966 S Dixie Hwy Ste 300, South Miami, FL 33143
        </p>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">xTriam</h1>
          <p className="mt-2 text-sm text-gray-600">Email Preferences</p>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UnsubscribeContent />
    </Suspense>
  );
}
