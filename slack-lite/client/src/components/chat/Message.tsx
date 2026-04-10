import React from "react";

interface MessageProps {
  message: {
    id: string;
    user: {
      name: string;
      avatar?: string;
    };
    content: string;
    createdAt: Date | string;
    isEdited?: boolean;
    reactions?: { emoji: string; count: number }[];
  };
  onReply?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
}

// Get initials safely
const getInitials = (name: string = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Format timestamp safely
const formatTimestamp = (date: Date | string) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Check if message is recent
const isRecent = (date: Date | string) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return false;
  const diffMs = new Date().getTime() - d.getTime();
  return diffMs < 5 * 60 * 1000;
};

export const Message: React.FC<MessageProps> = ({
  message,
  onReply,
  onReact,
}) => {
  const {
    id,
    user = { name: "Unknown" },
    content = "",
    createdAt,
    isEdited,
    reactions = [],
  } = message;

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
            className="w-9 h-9 rounded-md"
          />
        ) : (
          <div className="w-9 h-9 rounded-md bg-gray-300 flex items-center justify-center text-sm font-medium">
            {getInitials(user.name)}
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1">
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900">
            {user.name}
          </span>

          <span className="text-xs text-gray-500">
            {formatTimestamp(createdAt)}
          </span>

          {showNewBadge && (
            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
              New
            </span>
          )}

          {isEdited && (
            <span className="text-xs text-gray-400">(edited)</span>
          )}
        </div>

        <p className="text-gray-800 mt-0.5 break-words">
          {content}
        </p>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {reactions.map((reaction, idx) => (
              <button
                key={`${reaction.emoji}-${idx}`}
                onClick={() => onReact?.(id, reaction.emoji)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-sm"
              >
                <span>{reaction.emoji}</span>
                <span className="text-gray-600">
                  {reaction.count}
                </span>
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
              onClick={() => onReact?.(id, emoji)}
              className="p-1.5 hover:bg-gray-100 rounded"
              title={`React with ${emoji}`}
              type="button"
            >
              {emoji}
            </button>
          ))}

          <button
            onClick={() => onReply?.(id)}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
            title="Reply"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
};