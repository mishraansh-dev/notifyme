import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useIsAuthenticated, useCurrentUser } from '../store/useAuth';
import RoleBadge from './RoleBadge';
import { NavLink } from '../types';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isAuthenticated = useIsAuthenticated();
  const user = useCurrentUser();

  const navigation: NavLink[] = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    ...(isAuthenticated ? [
      { name: 'Dashboard', href: '/dashboard', current: location.pathname === '/dashboard' }
    ] : []),
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
              NotifyMe
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Auth Section */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3 ml-6">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <RoleBadge role={user ? (user.email.includes('admin') ? 'admin' : 'user') : 'user'} size="sm" />
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-6">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                item.current
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              aria-current={item.current ? 'page' : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Auth Section */}
          {isAuthenticated && user ? (
            <>
              <div className="px-3 py-2 border-t border-gray-300 mt-3 pt-3">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <RoleBadge role={user ? (user.email.includes('admin') ? 'admin' : 'user') : 'user'} size="sm" className="mb-3" />
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="border-t border-gray-300 mt-3 pt-3">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
