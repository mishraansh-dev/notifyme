import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6">Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" className="text-primary-600 hover:text-primary-500">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;

