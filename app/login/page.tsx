import { Metadata } from "next";
import { LoginForm } from "@/components/auth";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Customer Login | xTriam",
  description:
    "Sign in to access your xTriam customer support portal. Get AI-powered assistance, manage tickets, and view your account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="inline-block">
          <Image
            src="/images/logo/xTriam-Logo-Outlines-Blue-Orange.png"
            alt="xTriam"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <LoginForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">Need help?</p>
            <div className="flex justify-center gap-4 text-sm">
              <Link
                href="/contact"
                className="text-brand-blue-600 hover:text-brand-blue-700 font-medium"
              >
                Contact Support
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/faqs"
                className="text-brand-blue-600 hover:text-brand-blue-700 font-medium"
              >
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} xTriam. All rights reserved.{" "}
          <Link href="/privacy" className="hover:text-gray-700">
            Privacy Policy
          </Link>{" "}
          &bull;{" "}
          <Link href="/terms" className="hover:text-gray-700">
            Terms of Service
          </Link>
        </p>
      </footer>
    </div>
  );
}
