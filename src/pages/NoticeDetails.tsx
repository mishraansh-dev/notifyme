import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Notice } from '../types';

const NoticeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample notice data - to be fetched based on id
  const notice: Notice = {
    id: id || '1',
    title: 'Community Event: Movie Night',
    description: 'Join us for a movie night this Saturday at 8 PM in the community hall. Popcorn and drinks will be provided! This is a great opportunity to meet your neighbors and enjoy a relaxing evening together. We will be showing a family-friendly movie that everyone can enjoy.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    tag: 'Event',
    author: 'Events Committee',
    isPinned: false,
    reactions: { likes: 15, thumbsUp: 8, sad: 0 },
  };

  const handleBack = () => {
    // Navigate back to notices list
    window.history.back();
  };

  const handleContact = () => {
    const message = `Hello, I'm interested in the notice: ${notice.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  return (
    <Layout title="Notice Details">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{notice.title}</h2>
        <p className="text-lg text-gray-700 mb-4">{notice.description}</p>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-sm text-gray-500">Posted by {notice.author}</span>
          <span className="text-sm text-gray-500">{new Date(notice.timestamp).toLocaleDateString()}</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {notice.tag}
          </span>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleBack} 
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back
          </button>
          <button 
            onClick={handleContact} 
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Contact
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NoticeDetails;

