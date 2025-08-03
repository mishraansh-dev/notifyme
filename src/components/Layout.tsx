import React, { useState } from 'react';
import { Box, Flex, Heading, Container, useColorModeValue, InputGroup, InputLeftElement, Input, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
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

  // Call hooks at the top level
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headerBgColor = useColorModeValue('white', 'gray.800');
  const headerBorderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBgColor = useColorModeValue('white', 'gray.800');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const inputTextColor = useColorModeValue('gray.900', 'white');
  const titleColor = useColorModeValue('gray.900', 'white');

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
    <Box minH="100vh" bg={bgColor} display="flex" flexDir="column" className={className || ''}>
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <Flex flex="1">
        {/* Sidebar */}
        {withSidebar && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={handleSidebarClose}
            filters={filters || defaultFilters}
            onFiltersChange={onFiltersChange || (() => {})}
          />
        )}

        {/* Main content */}
        <Box flex="1" flexDir="column" minW="0">
          {/* Page header (optional) */}
          {(title || showSearch || withSidebar) && (
            <Box bg={headerBgColor} borderBottomWidth="1px" borderColor={headerBorderColor} px={{ base: 4, sm: 6, lg: 8 }} py={4}>
              <Flex flexDir={{ base: 'column', sm: 'row' }} align="center" justify="space-between" gap={3}>
                <Flex align="center" gap={3}>
                  {/* Sidebar toggle button (mobile + desktop) */}
                  {withSidebar && (
                    <IconButton
                      onClick={handleSidebarToggle}
                      icon={<HamburgerIcon w={5} h={5} />}
                      variant="ghost"
                      aria-label="Toggle sidebar"
                    />
                  )}

                  {/* Page title */}
                  {title && (
                    <Heading size="lg" fontWeight="semibold" color={titleColor}>
                      {title}
                    </Heading>
                  )}
                </Flex>

                {/* Search bar (if enabled) */}
                {showSearch && onSearchChange && (
                  <InputGroup maxW={{ base: "full", sm: "xs" }}>
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      value={searchValue}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Search notices..."
                      bg={inputBgColor}
                      borderColor={inputBorderColor}
                      color={inputTextColor}
                      focusBorderColor="brand.500"
                      _placeholder={{ color: 'gray.500' }}
                    />
                  </InputGroup>
                )}
              </Flex>
            </Box>
          )}

          {/* Page content */}
          <Container maxW="container.xl" py={{ base: 6, sm: 8 }} className={containerClassName || ''}>
            {children}
          </Container>
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
      
      {/* Toast Notifications */}
      <ToastNotification />
    </Box>
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
