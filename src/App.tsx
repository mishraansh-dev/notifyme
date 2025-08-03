import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import WardenPanel from './pages/WardenPanel';
import PostNotice from './pages/PostNotice';
import MyReports from './pages/MyReports';
import NoticeDetails from './pages/NoticeDetails';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Router>
      <Box minH="100vh" bg={bgColor}>
        <ErrorBoundary>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes - General Dashboard (redirects based on role) */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Role-specific dashboards */}
              <Route path="/user-dashboard" element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin-dashboard" element={
                <ProtectedRoute requiredRole="org">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/warden-panel" element={
                <ProtectedRoute requiredRole="warden">
                  <WardenPanel />
                </ProtectedRoute>
              } />
              
              {/* Feature routes */}
              <Route path="/post-notice" element={
                <ProtectedRoute requiredRole="org">
                  <PostNotice />
                </ProtectedRoute>
              } />
              
              <Route path="/my-reports" element={
                <ProtectedRoute>
                  <MyReports />
                </ProtectedRoute>
              } />
              
              <Route path="/notice/:id" element={
                <ProtectedRoute>
                  <NoticeDetails />
                </ProtectedRoute>
              } />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ErrorBoundary>
      </Box>
    </Router>
  );
}

export default App;
