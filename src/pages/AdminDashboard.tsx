import React, { useState, useEffect } from 'react';
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
  Select,
  Tooltip,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  TabList,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, ViewIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { FaUsers, FaChartBar, FaCalendarCheck, FaBell } from 'react-icons/fa';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { Notice, User, Report } from '../types';
import RoleBadge from '../components/RoleBadge';
import { useAuth, useCurrentUser } from '../store/useAuth';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const user = useCurrentUser();
  const toast = useToast();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  // Theme colors
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.800', 'white');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // Initialize sample data
  useEffect(() => {
    setNotices([
      {
        id: '1',
        title: 'Scheduled Maintenance Alert',
        description: 'There will be maintenance on all water lines this Saturday. Please prepare accordingly.',
        timestamp: new Date(),
        tag: 'Announcement',
        author: 'Committee',
      },
    ]);

    setUsers([
      { id: '1', name: 'John Doe', email: 'johndoe@example.com', role: 'user' },
      { id: '2', name: 'Jane Smith', email: 'janesmith@example.com', role: 'warden' },
    ]);

    setReports([
      { id: '1', title: 'Broken Light', description: 'Streetlight on Pine Blvd is broken.', status: 'pending' },
    ]);
  }, []);

  const handleCreateNotice = () => {
    toast({
      title: 'Notice Created',
      description: 'The notice has been created successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setShowCreateModal(false);
  };

  return (
    <Layout title='Admin Dashboard'>
      {/* Admin Info Header */}
      <Box bg={bg} rounded='lg' shadow='sm' borderWidth='1px' borderColor={borderColor} p={6} mb={6}>
        <Flex direction={{ base: 'column', sm: 'row' }} align='center' justify='space-between'>
          <HStack spacing={4} mb={{ base: 4, sm: 0 }}>
            <Avatar size='md' name={user.name} bg='brand.500' />
            <VStack align='start' spacing={0}>
              <Heading size='md' color={headingColor}>
                {user.name}
              </Heading>
              <Text fontSize='sm' color={textColor}>
                {user.email}
              </Text>
            </VStack>
            <RoleBadge role='org' size='sm' />
          </HStack>
          <HStack spacing={3}>
            <Tooltip label='Create Notice' placement='bottom'>
              <Button
                leftIcon={<AddIcon />}
                colorScheme='brand'
                onClick={() => setShowCreateModal(true)}
              >
                Create Notice
              </Button>
            </Tooltip>
            <Button variant='outline' onClick={logout}>
              Logout
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Main Content Tabs */}
      <Tabs variant='enclosed' colorScheme='brand'>
        <TabList>
          <Tab>Notices</Tab>
          <Tab>Users</Tab>
          <Tab>Reports</Tab>
        </TabList>

        <TabPanels>
          {/* Notices Tab */}
          <TabPanel px={0}>
            <VStack spacing={6} align='stretch'>
              <Flex align='center' justify='space-between'>
                <Heading size='lg' color={headingColor}>
                  Notices
                </Heading>
                <Text fontSize='sm' color={textColor}>
                  {notices.length} notices
                </Text>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {notices.map(notice => (
                  <Card key={notice.id} bg={bg} borderWidth='1px' borderColor={borderColor}>
                    <CardHeader pb={2}>
                      <Flex justify='space-between' align='start'>
                        <VStack align='start' spacing={1}>
                          <Heading size='md' color={headingColor}>
                            {notice.title}
                          </Heading>
                          <Badge colorScheme='blue'>{notice.tag}</Badge>
                        </VStack>
                        <Icon as={ViewIcon} color='blue.500' />
                      </Flex>
                    </CardHeader>
                    <CardBody pt={0}>
                      <Text color={textColor} mb={3}>
                        {notice.description}
                      </Text>
                      <Button size='sm' leftIcon={<ViewIcon />} variant='outline' mt={3}>
                        View Details
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </TabPanel>

          {/* Users Tab */}
          <TabPanel px={0}>
            <VStack spacing={6} align='stretch'>
              <Flex align='center' justify='space-between'>
                <Heading size='lg' color={headingColor}>
                  Users
                </Heading>
                <Text fontSize='sm' color={textColor}>
                  {users.length} users
                </Text>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {users.map(user => (
                  <Card key={user.id} bg={bg} borderWidth='1px' borderColor={borderColor}>
                    <CardHeader pb={2}>
                      <Flex justify='space-between' align='start'>
                        <VStack align='start' spacing={1}>
                          <Heading size='md' color={headingColor}>
                            {user.name}
                          </Heading>
                          <Badge colorScheme='purple'>{user.role}</Badge>
                        </VStack>
                        <Icon as={InfoOutlineIcon} color='purple.500' />
                      </Flex>
                    </CardHeader>
                    <CardBody pt={0}>
                      <Text color={textColor} mb={3}>
                        Email: {user.email}
                      </Text>
                      <Button size='sm' variant='outline' mt={3} onClick={() => setSelectedUser(user)}>
                        Manage User
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </TabPanel>

          {/* Reports Tab */}
          <TabPanel px={0}>
            <VStack spacing={6} align='stretch'>
              <Flex align='center' justify='space-between'>
                <Heading size='lg' color={headingColor}>
                  Reports
                </Heading>
                <Text fontSize='sm' color={textColor}>
                  {reports.length} reports
                </Text>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {reports.map(report => (
                  <Card key={report.id} bg={bg} borderWidth='1px' borderColor={borderColor}>
                    <CardHeader pb={2}>
                      <Flex justify='space-between' align='start'>
                        <VStack align='start' spacing={1}>
                          <Heading size='md' color={headingColor}>
                            {report.title}
                          </Heading>
                          <Badge colorScheme='orange'>{report.status}</Badge>
                        </VStack>
                        <Icon as={ViewIcon} color='orange.500' />
                      </Flex>
                    </CardHeader>
                    <CardBody pt={0}>
                      <Text color={textColor} mb={3}>
                        {report.description}
                      </Text>
                      <Button size='sm' leftIcon={<ViewIcon />} variant='outline' mt={3}>
                        View Details
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Create Notice Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title='Create New Notice'
        size='lg'
      >
        {/* Notice Form Placeholder */}
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;

