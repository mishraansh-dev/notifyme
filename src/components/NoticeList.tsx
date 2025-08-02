import React from 'react';
import NoticeCard from './NoticeCard';
import { Notice } from '../types';

interface NoticeListProps {
  notices: Notice[];
  className?: string;
  onNoticeClick?: (notice: Notice) => void;
  loading?: boolean;
  emptyMessage?: string;
}

const NoticeList: React.FC<NoticeListProps> = ({
  notices,
  className,
  onNoticeClick,
  loading = false,
  emptyMessage = 'No notices available at the moment.',
}) => {
  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Notices Found</h3>
      <p className="text-gray-500 text-center max-w-md">{emptyMessage}</p>
    </div>
  );

  // Sort notices - pinned first, then by timestamp (newest first)
  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  if (loading) {
    return (
      <div className={`grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ${className || ''}`}>
        {[...Array(6)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!notices || notices.length === 0) {
    return (
      <div className={`grid grid-cols-1 ${className || ''}`}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={`${className || ''}`}>
      {/* Notice count header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {notices.length === 1 ? '1 Notice' : `${notices.length} Notices`}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {notices.filter(n => n.isPinned).length > 0 && (
            <span className="text-primary-600 font-medium">
              {notices.filter(n => n.isPinned).length} pinned
              {notices.filter(n => !n.isPinned).length > 0 && ', '}
            </span>
          )}
          {notices.filter(n => !n.isPinned).length > 0 && (
            <span>
              {notices.filter(n => !n.isPinned).length} regular
            </span>
          )}
        </p>
      </div>

      {/* Notice grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {sortedNotices.map((notice) => (
          <NoticeCard
            key={notice.id}
            title={notice.title}
            description={notice.description}
            timestamp={notice.timestamp}
            tag={notice.tag}
            author={notice.author}
            isPinned={notice.isPinned}
            onCardClick={() => onNoticeClick?.(notice)}
            className="h-fit" // Ensures cards don't stretch unnecessarily
          />
        ))}
      </div>

      {/* Load more section (placeholder for future pagination) */}
      {notices.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Showing {notices.length} notice{notices.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default NoticeList;
