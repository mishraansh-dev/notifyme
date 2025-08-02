import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className={`bg-gray-50 border-t border-gray-200 mt-auto ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <div className="flex items-center mb-4 sm:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear}{' '}
              <span className="font-semibold text-primary-600">NotifyMe</span>.
              All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center space-x-4 sm:space-x-6">
            {footerLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <a
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {link.name}
                </a>
                {index < footerLinks.length - 1 && (
                  <span className="text-gray-400 hidden sm:inline">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Additional info for mobile */}
        <div className="mt-4 pt-4 border-t border-gray-200 sm:hidden">
          <p className="text-xs text-gray-500 text-center">
            Built for apartments, hostels, and clubs to simplify community communication.
          </p>
        </div>

        {/* Made with love section (optional) */}
        <div className="hidden sm:block mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <p className="text-xs text-gray-500 flex items-center">
              Made with
              <svg
                className="w-3 h-3 text-red-500 mx-1"
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
              for better community communication
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
