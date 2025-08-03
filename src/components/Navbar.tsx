import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  HStack,
  VStack,
  Collapse,
  useColorModeValue,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useAuth, useIsAuthenticated, useCurrentUser, useUserRole } from '../store/useAuth';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { isOpen: isMobileOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isAuthenticated = useIsAuthenticated();
  const user = useCurrentUser();
  const role = useUserRole();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Navigation links based on authentication and role
  const publicLinks = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
    { name: 'FAQs', href: '/faqs', current: location.pathname === '/faqs' },
  ];

  const authenticatedLinks = [
    { name: 'Dashboard', href: '/dashboard', current: location.pathname === '/dashboard' },
    ...(role === 'org' ? [
      { name: 'Post Notice', href: '/post-notice', current: location.pathname === '/post-notice' }
    ] : []),
    { name: 'My Reports', href: '/my-reports', current: location.pathname === '/my-reports' },
  ];

  const allLinks = [...publicLinks, ...(isAuthenticated ? authenticatedLinks : [])];

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  const getRoleDashboard = () => {
    switch (role) {
      case 'user': return '/user-dashboard';
      case 'org': return '/admin-dashboard';
      case 'warden': return '/warden-panel';
      default: return '/dashboard';
    }
  };

  return (
    <Box 
      as="nav" 
      boxShadow="md" 
      bg={bg} 
      borderBottom="1px" 
      borderColor={borderColor}
      width="100%" 
      pos="sticky" 
      top="0" 
      zIndex="1000"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" py={4}>
          {/* Logo */}
          <Text
            as={RouterLink}
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            color="brand.500"
            _hover={{ color: 'brand.600' }}
          >
            NotifyMe
          </Text>
          
          {/* Desktop Menu */}
          <HStack
            as="nav"
            spacing={6}
            display={{ base: 'none', lg: 'flex' }}
            align="center"
          >
            {allLinks.map((item) => (
              <Button 
                key={item.name} 
                as={RouterLink} 
                to={item.href} 
                variant={item.current ? 'solid' : 'ghost'}
                colorScheme={item.current ? 'brand' : 'gray'}
                size="md"
              >
                {item.name}
              </Button>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu or Auth Buttons */}
            {isAuthenticated && user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={<Avatar size="sm" name={user.name} />}
                  variant="ghost"
                >
                  {user.name}
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem as={RouterLink} to={getRoleDashboard()}>
                    {role === 'org' ? 'Admin Dashboard' : 
                     role === 'warden' ? 'Warden Panel' : 
                     'My Dashboard'}
                  </MenuItem>
                  {role === 'org' && (
                    <MenuItem as={RouterLink} to="/post-notice">
                      Post Notice
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout} color="red.500">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={3}>
                <Button 
                  as={RouterLink} 
                  to="/login" 
                  variant="ghost" 
                  size="md"
                >
                  Login
                </Button>
                <Button 
                  as={RouterLink} 
                  to="/register" 
                  colorScheme="brand" 
                  size="md"
                >
                  Register
                </Button>
              </HStack>
            )}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton 
            aria-label="Toggle Navigation"
            onClick={onOpen}
            icon={<HamburgerIcon />}
            display={{ lg: 'none' }}
            variant="ghost"
            size="md"
          />
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isMobileOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Text color="brand.500" fontWeight="bold">
              NotifyMe
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={4}>
              {/* Navigation Links */}
              {allLinks.map((item) => (
                <Button 
                  key={item.name} 
                  as={RouterLink} 
                  to={item.href} 
                  variant={item.current ? 'solid' : 'ghost'}
                  colorScheme={item.current ? 'brand' : 'gray'}
                  justifyContent="flex-start"
                  onClick={onClose}
                >
                  {item.name}
                </Button>
              ))}

              {/* Theme Toggle */}
              <Box py={2}>
                <ThemeToggle />
              </Box>

              {/* User Menu or Auth Buttons */}
              {isAuthenticated && user ? (
                <VStack spacing={3} align="stretch" pt={4} borderTopWidth="1px">
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Signed in as {user.name}
                  </Text>
                  <Button 
                    as={RouterLink} 
                    to="/profile" 
                    variant="ghost"
                    justifyContent="flex-start"
                    onClick={onClose}
                  >
                    Profile
                  </Button>
                  <Button 
                    as={RouterLink} 
                    to={getRoleDashboard()} 
                    variant="ghost"
                    justifyContent="flex-start"
                    onClick={onClose}
                  >
                    {role === 'org' ? 'Admin Dashboard' : 
                     role === 'warden' ? 'Warden Panel' : 
                     'My Dashboard'}
                  </Button>
                  {role === 'org' && (
                    <Button 
                      as={RouterLink} 
                      to="/post-notice" 
                      variant="ghost"
                      justifyContent="flex-start"
                      onClick={onClose}
                    >
                      Post Notice
                    </Button>
                  )}
                  <Button 
                    onClick={handleLogout} 
                    colorScheme="red" 
                    variant="outline"
                  >
                    Logout
                  </Button>
                </VStack>
              ) : (
                <VStack spacing={3} align="stretch" pt={4} borderTopWidth="1px">
                  <Button 
                    as={RouterLink} 
                    to="/login" 
                    variant="outline" 
                    onClick={onClose}
                  >
                    Login
                  </Button>
                  <Button 
                    as={RouterLink} 
                    to="/register" 
                    colorScheme="brand"
                    onClick={onClose}
                  >
                    Register
                  </Button>
                </VStack>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;

