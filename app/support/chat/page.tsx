import { ChatInterface } from "@/components/support/ChatInterface";

export default function ChatPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Assistant</h1>
        <p className="text-gray-600">
          Get instant answers about bpmPro, troubleshooting, and best practices.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}
