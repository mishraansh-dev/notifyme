import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import NoticeCard from '../components/NoticeCard';
import NoticeForm from '../components/NoticeForm';
import RoleBadge from '../components/RoleBadge';
import Modal from '../components/Modal';
import { Notice } from '../types';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout, profile } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  if (!profile) {
    navigate('/login');
    return null;
  }
  
  const notices: Notice[] = [
    {
      id: '1',
      title: 'Sample Notice',
      description: 'This is a sample description for the notice.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tag: 'Sample Tag',
      author: profile.name,
    }
  ];

  const orgNotices: Notice[] = [
    {
      id: '3',
      title: 'Wi-Fi Maintenance',
      description: 'Scheduled maintenance for building Wi-Fi infrastructure.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      tag: 'Maintenance',
      author: 'IT Department',
      isPinned: true,
    },
    {
      id: '4',
      title: 'Monthly Meeting',
      description: 'Monthly residents meeting scheduled for next Friday.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      tag: 'Event',
      author: 'Management',
    },
  ];

  const handleLogout = () => {
    logout();
    // Note: logout function already shows success message
    navigate('/login');
  };

  const handleCreateNotice = (formData: any) => {
    // Handle notice creation
    console.log('Creating notice:', formData);
    setShowCreateModal(false);
  };

  const dashboardTitle = profile.role === 'citizen' ? 'Citizen Dashboard' : 'Organization Dashboard';
  const sectionTitle = profile.role === 'citizen' ? 'My Submitted Notices' : 'Managed Notices';

  return (
    <Layout title={dashboardTitle} withSidebar>
      {/* User Info Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary-600">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
            <RoleBadge role={profile.role} size="sm" />
          </div>
          <div className="flex space-x-3">
            {profile.role === 'citizen' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                Create Notice
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Notices Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{sectionTitle}</h2>
          <span className="text-sm text-gray-600">
            {notices.length} {notices.length === 1 ? 'notice' : 'notices'}
          </span>
        </div>
      </div>

      {/* Notices Grid */}
      {notices.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notices.map(notice => (
            <NoticeCard 
              key={notice.id} 
              {...notice}
              onCardClick={() => navigate(`/notice/${notice.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notices yet</h3>
          <p className="text-gray-500 mb-6">
            {profile.role === 'citizen' 
              ? "You haven't submitted any notices yet." 
              : "No notices assigned to your organization yet."
            }
          </p>
          {profile.role === 'citizen' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              Create Your First Notice
            </button>
          )}
        </div>
      )}

      {/* Create Notice Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Notice"
        size="lg"
      >
        <NoticeForm
          onSubmit={handleCreateNotice}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>
    </Layout>
  );
};

export default Dashboard;

