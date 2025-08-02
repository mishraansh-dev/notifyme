import React from 'react';

interface NoticeCardProps {
  title: string;
  description: string;
  timestamp: Date;
  tag?: string;
  author?: string;
  isPinned?: boolean;
  className?: string;
  onCardClick?: () => void;
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  title,
  description,
  timestamp,
  tag,
  author,
  isPinned = false,
  className,
  onCardClick,
}) => {
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getTagColor = (tagName?: string) => {
    if (!tagName) return '';
    const colors = {
      'Block A': 'bg-blue-100 text-blue-800',
      'Block B': 'bg-green-100 text-green-800',
      'Block C': 'bg-purple-100 text-purple-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Emergency': 'bg-red-100 text-red-800',
      'Event': 'bg-indigo-100 text-indigo-800',
      'General': 'bg-gray-100 text-gray-800',
    };
    return colors[tagName as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden cursor-pointer ${className || ''} ${
        isPinned ? 'border-primary-300 ring-2 ring-primary-100' : ''
      }`}
      onClick={onCardClick}
    >
      {/* Pinned indicator */}
      {isPinned && (
        <div className="bg-primary-50 px-4 py-2 border-b border-primary-200">
          <div className="flex items-center text-primary-700 text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Pinned Notice
          </div>
        </div>
      )}

      <div className="p-4 sm:p-6">
        {/* Header with title and tag */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-0 pr-0 sm:pr-4">
            {title}
          </h3>
          {tag && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                getTagColor(tag)
              }`}
            >
              {tag}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Footer with timestamp and author */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
          <div className="flex items-center mb-2 sm:mb-0">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {formatTimestamp(timestamp)}
          </div>
          {author && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium">By {author}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
