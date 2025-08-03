import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Avatar,
  HStack,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { AddIcon, WarningIcon, EmailIcon, ViewIcon } from '@chakra-ui/icons';
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaClock } from 'react-icons/fa';
import Layout from '../components/Layout';
import NoticeCard from '../components/NoticeCard';
import RoleBadge from '../components/RoleBadge';
import Modal from '../components/Modal';
import { Notice } from '../types';
import { useAuth, useCurrentUser } from '../store/useAuth';

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  submittedAt: Date;
  priority: 'low' | 'medium' | 'high';
}

const UserDashboard: React.FC = () => {
  const { logout } = useAuth();
  const user = useCurrentUser();
  const toast = useToast();
  
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  // Theme colors
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  // Sample data
  const notices: Notice[] = [
    {
      id: '1',
      title: 'Community BBQ Event This Weekend',
      description: 'Join us for a community BBQ this Saturday at the park from 12 PM to 6 PM. Free food and entertainment!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      tag: 'Event',
      author: 'Community Committee',
    },
    {
      id: '2',
      title: 'Water Supply Maintenance',
      description: 'Scheduled water supply maintenance on Sunday from 8 AM to 2 PM. Please store water in advance.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      tag: 'Maintenance',
      author: 'Maintenance Team',
    },
    {
      id: '3',
      title: 'New Security Protocols',
      description: 'Updated security protocols are now in effect. Please carry your ID cards at all times.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      tag: 'Security',
      author: 'Security Department',
    },
  ];

  const myIssues: Issue[] = [
    {
      id: '1',
      title: 'Broken Street Light',
      description: 'Street light on Oak Avenue is not working for the past week.',
      category: 'Infrastructure',
      status: 'in-progress',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      priority: 'medium',
    },
    {
      id: '2',
      title: 'Noise Complaint',
      description: 'Loud music from apartment 3B every night after 11 PM.',
      category: 'Noise',
      status: 'pending',
      submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      priority: 'high',
    },
  ];

  const handleReportSubmit = () => {
    if (!reportForm.title.trim() || !reportForm.description.trim() || !reportForm.category) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulate API call
    toast({
      title: 'Issue Reported',
      description: 'Your issue has been submitted successfully. You will receive updates via email.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setReportForm({
      title: '',
      description: '',
      category: '',
      priority: 'medium'
    });
    setShowReportModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'green';
      case 'in-progress': return 'blue';
      case 'pending': return 'orange';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return FaCheckCircle;
      case 'in-progress': return FaClock;
      case 'pending': return FaExclamationTriangle;
      default: return FaClock;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Layout title="Resident Dashboard">
      {/* User Info Header */}
      <Box bg={bg} rounded="lg" shadow="sm" borderWidth="1px" borderColor={borderColor} p={6} mb={6}>
        <Flex direction={{ base: 'column', sm: 'row' }} align="center" justify="space-between">
          <HStack spacing={4} mb={{ base: 4, sm: 0 }}>
            <Avatar size="md" name={user.name} bg="brand.500" />
            <VStack align="start" spacing={0}>
              <Heading size="md" color={headingColor}>
                {user.name}
              </Heading>
              <Text fontSize="sm" color={textColor}>
                {user.email}
              </Text>
            </VStack>
            <RoleBadge role="user" size="sm" />
          </HStack>
          <HStack spacing={3}>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="brand"
              onClick={() => setShowReportModal(true)}
            >
              Report Issue
            </Button>
            <Button
              leftIcon={<EmailIcon />}
              variant="outline"
              colorScheme="blue"
            >
              Contact Committee
            </Button>
            <Button
              variant="outline"
              onClick={logout}
            >
              Logout
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Quick Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Card bg={cardBg}>
          <CardBody>
            <HStack>
              <Icon as={FaBell} boxSize={8} color="blue.500" />
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
                  {notices.length}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  Active Notices
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg}>
          <CardBody>
            <HStack>
              <Icon as={FaExclamationTriangle} boxSize={8} color="orange.500" />
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
                  {myIssues.length}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  Reported Issues
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        
        <Card bg={cardBg}>
          <CardBody>
            <HStack>
              <Icon as={FaCheckCircle} boxSize={8} color="green.500" />
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
                  {myIssues.filter(issue => issue.status === 'resolved').length}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  Resolved Issues
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Main Content Tabs */}
      <Tabs variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>Community Notices</Tab>
          <Tab>My Issues</Tab>
        </TabList>

        <TabPanels>
          {/* Notices Tab */}
          <TabPanel px={0}>
            <VStack spacing={6} align="stretch">
              <Flex align="center" justify="space-between">
                <Heading size="lg" color={headingColor}>
                  Latest Community Notices
                </Heading>
                <Text fontSize="sm" color={textColor}>
                  {notices.length} active notices
                </Text>
              </Flex>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {notices.map(notice => (
                  <NoticeCard 
                    key={notice.id} 
                    {...notice}
                    onCardClick={() => console.log('View notice', notice.id)}
                  />
                ))}
              </SimpleGrid>
            </VStack>
          </TabPanel>

          {/* Issues Tab */}
          <TabPanel px={0}>
            <VStack spacing={6} align="stretch">
              <Flex align="center" justify="space-between">
                <Heading size="lg" color={headingColor}>
                  My Reported Issues
                </Heading>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="brand"
                  size="sm"
                  onClick={() => setShowReportModal(true)}
                >
                  Report New Issue
                </Button>
              </Flex>
              
              {myIssues.length > 0 ? (
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                  {myIssues.map(issue => (
                    <Card key={issue.id} bg={bg} borderWidth="1px" borderColor={borderColor}>
                      <CardHeader pb={2}>
                        <Flex justify="space-between" align="start">
                          <VStack align="start" spacing={1}>
                            <Heading size="md" color={headingColor}>
                              {issue.title}
                            </Heading>
                            <HStack>
                              <Badge colorScheme={getStatusColor(issue.status)}>
                                {issue.status}
                              </Badge>
                              <Badge colorScheme={getPriorityColor(issue.priority)}>
                                {issue.priority} priority
                              </Badge>
                            </HStack>
                          </VStack>
                          <Icon as={getStatusIcon(issue.status)} color={`${getStatusColor(issue.status)}.500`} />
                        </Flex>
                      </CardHeader>
                      <CardBody pt={0}>
                        <Text color={textColor} mb={3}>
                          {issue.description}
                        </Text>
                        <HStack justify="space-between" fontSize="sm" color={textColor}>
                          <Text>Category: {issue.category}</Text>
                          <Text>
                            Submitted: {issue.submittedAt.toLocaleDateString()}
                          </Text>
                        </HStack>
                        <Button
                          size="sm"
                          leftIcon={<ViewIcon />}
                          variant="outline"
                          mt={3}
                          onClick={() => console.log('View issue details', issue.id)}
                        >
                          View Details
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <VStack spacing={6} py={12} textAlign="center">
                  <Icon as={FaExclamationTriangle} boxSize={16} color="gray.400" />
                  <Heading size="md" color={headingColor}>
                    No Issues Reported
                  </Heading>
                  <Text color={textColor} maxW="md">
                    You haven't reported any issues yet. Use the "Report Issue" button to submit your first report.
                  </Text>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="brand"
                    onClick={() => setShowReportModal(true)}
                  >
                    Report Your First Issue
                  </Button>
                </VStack>
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Report Issue Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Report an Issue"
        size="lg"
      >
        <VStack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Issue Title</FormLabel>
            <Input
              placeholder="Brief description of the issue"
              value={reportForm.title}
              onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select issue category"
              value={reportForm.category}
              onChange={(e) => setReportForm({...reportForm, category: e.target.value})}
            >
              <option value="Infrastructure">Infrastructure</option>
              <option value="Noise">Noise Complaint</option>
              <option value="Security">Security</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Priority</FormLabel>
            <Select
              value={reportForm.priority}
              onChange={(e) => setReportForm({...reportForm, priority: e.target.value as 'low' | 'medium' | 'high'})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Provide detailed information about the issue..."
              rows={4}
              value={reportForm.description}
              onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
            />
          </FormControl>

          <HStack spacing={3} width="100%" justify="flex-end">
            <Button
              variant="outline"
              onClick={() => setShowReportModal(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              onClick={handleReportSubmit}
            >
              Submit Report
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </Layout>
  );
};

export default UserDashboard;
