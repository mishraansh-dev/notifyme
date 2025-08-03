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
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { FaClipboardCheck, FaCommentDots } from 'react-icons/fa';
import Layout from '../components/Layout';
import RoleBadge from '../components/RoleBadge';
import Modal from '../components/Modal';
import { useAuth, useCurrentUser } from '../store/useAuth';

interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  lastUpdated: Date;
  comment: string;
}

const WardenPanel: React.FC = () => {
  const { logout } = useAuth();
  const user = useCurrentUser();
  const toast = useToast();
  const [issues, setIssues] = useState<Issue[]>([{
    id: '1',
    title: 'Leaking Pipe Complaint',
    description: 'There is a water leak in Building C on the ground floor.',
    status: 'open',
    lastUpdated: new Date(),
    comment: 'Under Review',
  }]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');

  // Theme colors
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  const updateIssueComment = () => {
    if (selectedIssue) {
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === selectedIssue.id ? { ...issue, comment: comment || issue.comment , lastUpdated: new Date()} : issue
        )
      );
      toast({
        title: 'Comment Updated',
        description: `Comment for ${selectedIssue.title} has been updated.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setShowCommentModal(false);
      setSelectedIssue(null);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Layout title="Warden Panel">
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
            <RoleBadge role="warden" size="sm" />
          </HStack>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </Flex>
      </Box>

      {/* Issues Section */}
      <Tabs variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>Manage Issues</Tab>
          <Tab>Reports</Tab>
        </TabList>

        <TabPanels>
          {/* Manage Issues Tab */}
          <TabPanel px={0}>
            <VStack spacing={6} align="stretch">
              <Flex align="center" justify="space-between">
                <Heading size="lg" color={headingColor}>
                  Current Issues
                </Heading>
                <Text fontSize="sm" color={textColor}>
                  {issues.length} total issues
                </Text>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {issues.map(issue => (
                  <Card key={issue.id} bg={bg} borderWidth="1px" borderColor={borderColor}>
                    <CardHeader pb={2}>
                      <Flex justify="space-between" align="start">
                        <VStack align="start" spacing={1}>
                          <Heading size="md" color={headingColor}>
                            {issue.title}
                          </Heading>
                          <Badge colorScheme={issue.status === 'open' ? 'red' : issue.status === 'in-progress' ? 'blue' : 'green'}>
                            {issue.status}
                          </Badge>
                        </VStack>
                        <Icon as={ViewIcon} color="blue.500" />
                      </Flex>
                    </CardHeader>
                    <CardBody pt={0}>
                      <Text color={textColor} mb={3}>
                        {issue.description}
                      </Text>
                      <Button size="sm" leftIcon={<EditIcon />} variant="outline" mt={3} onClick={() => {
                        setSelectedIssue(issue);
                        setComment(issue.comment);
                        setShowCommentModal(true);
                      }}>
                        Update Comment
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </TabPanel>

          {/* Reports Tab */}
          <TabPanel px={0}>
            <VStack spacing={6} py={12} textAlign="center">
              <Icon as={FaClipboardCheck} boxSize={16} color="gray.400" />
              <Heading size="md" color={headingColor}>
                Reports Section Coming Soon!
              </Heading>
              <Text color={textColor} maxW="md">
                This section will display the reports handled by the warden.
              </Text>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Comment Modal */}
      <Modal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        title="Update Issue Comment"
        size="lg"
      >
        <VStack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Comment</FormLabel>
            <Textarea
              placeholder="Add a comment regarding this issue..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormControl>
          <HStack spacing={3} width="100%" justify="flex-end">
            <Button
              variant="outline"
              onClick={() => setShowCommentModal(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              onClick={updateIssueComment}
            >
              Save Comment
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </Layout>
  );
};

export default WardenPanel;

