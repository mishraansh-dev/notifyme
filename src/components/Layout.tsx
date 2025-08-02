import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar, { FilterOptions } from './Sidebar';
import Footer from './Footer';
import ToastNotification from './ToastNotification';

interface LayoutProps {
  children: React.ReactNode;
  withSidebar?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: (isOpen: boolean) => void;
  filters?: FilterOptions;
  onFiltersChange?: (filters: FilterOptions) => void;
  className?: string;
  containerClassName?: string;
  title?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  withSidebar = false,
  sidebarOpen: controlledSidebarOpen,
  onSidebarToggle,
  filters,
  onFiltersChange,
  className,
  containerClassName,
  title,
  showSearch = false,
  searchValue = '',
  onSearchChange,
}) => {
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(false);

  // Use controlled or internal sidebar state
  const sidebarOpen = controlledSidebarOpen !== undefined ? controlledSidebarOpen : internalSidebarOpen;
  const setSidebarOpen = onSidebarToggle || setInternalSidebarOpen;

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const defaultFilters: FilterOptions = {
    tags: [],
    sortBy: 'newest',
    showPinned: true,
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${className || ''}`}>
      {/* Navbar */}
      <Navbar className="relative z-40" />

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        {withSidebar && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={handleSidebarClose}
            filters={filters || defaultFilters}
            onFiltersChange={onFiltersChange || (() => {})}
            className="relative z-30"
          />
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Page header (optional) */}
          {(title || showSearch || withSidebar) && (
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  {/* Sidebar toggle button (mobile + desktop) */}
                  {withSidebar && (
                    <button
                      onClick={handleSidebarToggle}
                      className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      aria-label="Toggle sidebar"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Page title */}
                  {title && (
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      {title}
                    </h1>
                  )}
                </div>

                {/* Search bar (if enabled) */}
                {showSearch && onSearchChange && (
                  <div className="w-full sm:w-96">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search notices..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Page content */}
          <div className={`flex-1 ${containerClassName || 'container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'}`}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Toast Notifications */}
      <ToastNotification />
    </div>
  );
};

// Specialized layout variants
export const DashboardLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  filters?: FilterOptions;
  onFiltersChange?: (filters: FilterOptions) => void;
  className?: string;
}> = ({ children, title, filters, onFiltersChange, className }) => (
  <Layout
    withSidebar
    title={title}
    showSearch
    filters={filters}
    onFiltersChange={onFiltersChange}
    className={className}
  >
    {children}
  </Layout>
);

export const SimpleLayout: React.FC<{
  children: React.ReactNode;
  title?: string;
  className?: string;
}> = ({ children, title, className }) => (
  <Layout title={title} className={className}>
    {children}
  </Layout>
);

export const FullWidthLayout: React.FC<{
  children: React.ReactNode;
  title?: string;
  className?: string;
}> = ({ children, title, className }) => (
  <Layout
    title={title}
    containerClassName="w-full"
    className={className}
  >
    {children}
  </Layout>
);

// Hook for managing layout state
export const useLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    tags: [],
    sortBy: 'newest',
    showPinned: true,
  });
  const [searchValue, setSearchValue] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      tags: [],
      sortBy: 'newest',
      showPinned: true,
    });
  };

  const updateSearch = (value: string) => {
    setSearchValue(value);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return {
    // Sidebar state
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    
    // Filters state
    filters,
    updateFilters,
    clearFilters,
    
    // Search state
    searchValue,
    updateSearch,
    clearSearch,
  };
};

export default Layout;
