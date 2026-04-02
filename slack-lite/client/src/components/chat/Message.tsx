import React from "react";

interface MessageProps {
  message: {
    id: string;
    content: string;
    channelId: string;
    userId: string;
    user: {
      id: string;
      name: string;
      avatar?: string;
    };
    fileUrl?: string;
    fileName?: string;
    fileType?: string;
    createdAt: Date | string;
    isEdited?: boolean;
    reactions?: { emoji: string; count: number }[];
  };
  onReply?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
}

// Get initials from user name
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Format timestamp
const formatTimestamp = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();

  const timeStr = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) {
    return timeStr;
  }

  const dateStr = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return `${dateStr}, ${timeStr}`;
};

// Check if message is recent (within last 5 minutes)
const isRecent = (date: Date | string): boolean => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  return diffMs < 5 * 60 * 1000; // 5 minutes
};

export const Message: React.FC<MessageProps> = ({ message, onReply, onReact }) => {
  const { user, content, createdAt, isEdited, reactions = [] } = message;
  const showNewBadge = isRecent(createdAt);

  const quickEmojis = ["👍", "😂", "❤️", "🎉", "👀"];

  return (
    <div className="flex gap-3 px-4 py-2 hover:bg-gray-50 group relative">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium text-sm">
            {getInitials(user.name)}
          </div>
        )}
      </div>

      {/* Message content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-gray-900">{user.name}</span>
          <span className="text-xs text-gray-500">
            {formatTimestamp(createdAt)}
          </span>
          {showNewBadge && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              New
            </span>
          )}
          {isEdited && (
            <span className="text-xs text-gray-400 italic">(edited)</span>
          )}
        </div>
        <p className="text-gray-800 mt-0.5 break-words">{content}</p>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {reactions.map((reaction, idx) => (
              <button
                key={idx}
                onClick={() => onReact?.(message.id, reaction.emoji)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-sm"
              >
                <span>{reaction.emoji}</span>
                <span className="text-gray-600">{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hover actions */}
      <div className="absolute right-2 -top-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-0.5 bg-white border border-gray-200 rounded-md shadow-sm">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onReact?.(message.id, emoji)}
              className="p-1.5 hover:bg-gray-100 rounded"
              title={`React with ${emoji}`}
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={() => onReply?.(message.id)}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
            title="Reply"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;