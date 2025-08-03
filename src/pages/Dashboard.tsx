import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useCurrentUser, useUserRole } from '../store/useAuth';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import WardenPanel from './WardenPanel';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const role = useUserRole();
  
  if (!user) {
    navigate('/login');
    return null;
  }

  // Route to appropriate dashboard based on role
  switch (role) {
    case 'user':
      return <UserDashboard />;
    case 'org':
      return <AdminDashboard />;
    case 'warden':
      return <WardenPanel />;
    default:
      return <UserDashboard />;
  }
};

export default Dashboard;

