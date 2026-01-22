import Link from "next/link";

const quickActions = [
  {
    title: "AI Assistant",
    description: "Get instant help from our AI-powered support assistant",
    href: "/support/chat",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    color: "brand-blue",
  },
  {
    title: "Create Ticket",
    description: "Submit a new support request to our team",
    href: "/support/tickets/new",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
    color: "brand-orange",
  },
  // TODO: Re-enable Knowledge Base when content is ready
  // {
  //   title: "Knowledge Base",
  //   description: "Browse FAQs and documentation",
  //   href: "/support/knowledge",
  //   icon: (
  //     <svg
  //       className="w-8 h-8"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={1.5}
  //         d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  //       />
  //     </svg>
  //   ),
  //   color: "green",
  // },
  // TODO: Re-enable My Account when functionality is ready
  // {
  //   title: "My Account",
  //   description: "View your account and subscription details",
  //   href: "/support/account",
  //   icon: (
  //     <svg
  //       className="w-8 h-8"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={1.5}
  //         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  //       />
  //     </svg>
  //   ),
  //   color: "purple",
  // },
];

const colorClasses: Record<string, { bg: string; text: string; hover: string }> = {
  "brand-blue": {
    bg: "bg-brand-blue-50",
    text: "text-brand-blue-600",
    hover: "hover:border-brand-blue-300",
  },
  "brand-orange": {
    bg: "bg-brand-orange-50",
    text: "text-brand-orange-600",
    hover: "hover:border-brand-orange-300",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    hover: "hover:border-green-300",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:border-purple-300",
  },
};

export default function SupportDashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Customer Support
        </h1>
        <p className="text-gray-600">
          How can we help you today? Choose from the options below.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {quickActions.map((action) => {
          const colors = colorClasses[action.color];
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`
                block p-6 bg-white rounded-xl border border-gray-200
                transition-all duration-200 hover:shadow-md ${colors.hover}
              `}
            >
              <div
                className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}
              >
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-r from-brand-blue-600 to-brand-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Need to speak with us?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-white/80">Phone Support</p>
              <a
                href="tel:+13052049694"
                className="font-medium hover:underline"
              >
                (305) 204-9694
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-white/80">Email Support</p>
              <a
                href="mailto:support@xtriam.com"
                className="font-medium hover:underline"
              >
                support@xtriam.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
