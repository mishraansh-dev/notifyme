import React from 'react';

export interface FilterOptions {
  tags: string[];
  sortBy: 'newest' | 'oldest';
  showPinned: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  className,
}) => {
  const availableTags = [
    'Announcement',
    'Alert', 
    'Event',
    'Maintenance',
    'Emergency',
    'Block A',
    'Block B',
    'Block C',
    'General',
  ];

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...filters.tags, tag]
      : filters.tags.filter(t => t !== tag);
    
    onFiltersChange({
      ...filters,
      tags: newTags,
    });
  };

  const handleSortChange = (sortBy: 'newest' | 'oldest') => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const handlePinnedToggle = (showPinned: boolean) => {
    onFiltersChange({
      ...filters,
      showPinned,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      tags: [],
      sortBy: 'newest',
      showPinned: true,
    });
  };

  const hasActiveFilters = filters.tags.length > 0 || filters.sortBy !== 'newest' || !filters.showPinned;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:border-r md:border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className || ''}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100 md:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 md:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* Sort Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sort by Date</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="newest"
                  checked={filters.sortBy === 'newest'}
                  onChange={() => handleSortChange('newest')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Newest First</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="oldest"
                  checked={filters.sortBy === 'oldest'}
                  onChange={() => handleSortChange('oldest')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Oldest First</span>
              </label>
            </div>
          </div>

          {/* Pinned Notice Toggle */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Display Options</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.showPinned}
                onChange={(e) => handlePinnedToggle(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Show Pinned Notices</span>
            </label>
          </div>

          {/* Tags Filter */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Filter by Tags</h3>
              {filters.tags.length > 0 && (
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                  {filters.tags.length} selected
                </span>
              )}
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableTags.map((tag) => (
                <label key={tag} className="flex items-center hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={(e) => handleTagChange(tag, e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 flex-1">{tag}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTagBadgeColor(tag)}`}>
                    {tag}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => onFiltersChange({ ...filters, tags: ['Emergency'] })}
                className="w-full text-left px-3 py-2 text-sm text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                Show Emergency Only
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, tags: ['Event'] })}
                className="w-full text-left px-3 py-2 text-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
              >
                Show Events Only
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, tags: ['Maintenance'] })}
                className="w-full text-left px-3 py-2 text-sm text-yellow-700 bg-yellow-50 hover:bg-yellow-100 rounded-md transition-colors"
              >
                Show Maintenance Only
              </button>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h3>
              <div className="space-y-2">
                {filters.tags.length > 0 && (
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Tags:</span> {filters.tags.join(', ')}
                  </div>
                )}
                {filters.sortBy !== 'newest' && (
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Sort:</span> {filters.sortBy === 'oldest' ? 'Oldest First' : 'Newest First'}
                  </div>
                )}
                {!filters.showPinned && (
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Pinned notices hidden</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Helper function to get tag badge colors
const getTagBadgeColor = (tag: string) => {
  const colors = {
    'Announcement': 'bg-blue-100 text-blue-800',
    'Alert': 'bg-red-100 text-red-800',
    'Event': 'bg-indigo-100 text-indigo-800',
    'Maintenance': 'bg-yellow-100 text-yellow-800',
    'Emergency': 'bg-red-100 text-red-800',
    'Block A': 'bg-green-100 text-green-800',
    'Block B': 'bg-purple-100 text-purple-800',
    'Block C': 'bg-pink-100 text-pink-800',
    'General': 'bg-gray-100 text-gray-800',
  };
  return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default Sidebar;
