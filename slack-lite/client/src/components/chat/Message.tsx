import React from "react";
import { MessageEvent } from "../../../../server/src/types";

interface MessageProps {
  message: MessageEvent;
}

/**
 * Format a date to a human-readable time string
 * Shows time for today's messages, date for older messages
 */
function formatMessageTime(date: Date): string {
  const messageDate = new Date(date);
  const now = new Date();
  const isToday = messageDate.toDateString() === now.toDateString();

  if (isToday) {
    return messageDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Message component displays a single chat message with:
 * - User avatar (or placeholder)
 * - User name
 * - Message content
 * - Formatted timestamp
 */
export const Message: React.FC<MessageProps> = ({ message }) => {
  const { user, content, createdAt } = message;

  // Get user initials for avatar placeholder
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-start gap-3 px-4 py-2 hover:bg-gray-50">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium text-sm">
            {initials}
          </div>
        )}
      </div>

      {/* Message content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-gray-900">{user.name}</span>
          <time
            className="text-xs text-gray-500"
            dateTime={new Date(createdAt).toISOString()}
          >
            {formatMessageTime(createdAt)}
          </time>
        </div>
        <p className="text-gray-700 mt-0.5 break-words">{content}</p>
      </div>
    </div>
  );
};

export default Message;