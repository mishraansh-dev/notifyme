import React from 'react';
import { useAuth } from '../context/AuthContext';
import OrgDashboard from '../components/OrgDashboard';

const OrgPanel: React.FC = () => {
  const { profile } = useAuth();
  
  if (!profile?.orgName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Organization information not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <OrgDashboard orgName={profile.orgName} />
    </div>
  );
};

export default OrgPanel;

