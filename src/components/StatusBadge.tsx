import React from 'react';

export type NoticeStatus = 'pending' | 'ongoing' | 'completed';

interface StatusBadgeProps {
  status: NoticeStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: '⏳'
    },
    ongoing: {
      label: 'Ongoing',
      className: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: '🔄'
    },
    completed: {
      label: 'Completed',
      className: 'bg-green-100 text-green-800 border-green-200',
      icon: '✅'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className} ${className}`}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <span className="mr-1" aria-hidden="true">
        {config.icon}
      </span>
      {config.label}
    </span>
  );
};

export default StatusBadge;
