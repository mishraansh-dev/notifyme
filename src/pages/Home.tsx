import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Icon,
  Stack,
  Flex,
  Image,
  Badge,
  useColorModeValue,
  Center,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { FaBell, FaUsers, FaShieldAlt, FaMobile, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import NoticeCard from '../components/NoticeCard';
import { Notice } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const sampleNotices: Notice[] = [
    {
      id: '1',
      title: 'Welcome to NotifyMe!',
      description: 'Stay updated with community announcements and events.',
      timestamp: new Date(),
      tag: 'General',
    },
    {
      id: '2',
      title: 'Community BBQ this weekend',
      description: 'Join us for a BBQ in the park this Saturday at noon!',
      timestamp: new Date(),
      tag: 'Event',
    },
    {
      id: '3',
      title: 'Water Supply Issue',
      description: 'There will be a planned outage on Sunday from 8 AM to 12 PM.',
      timestamp: new Date(),
      tag: 'Maintenance',
    },
  ];


  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, blue.50)',
    'linear(to-br, gray.900, blue.900)'
  );
  const heroTextColor = useColorModeValue('gray.800', 'white');
  const featureBg = useColorModeValue('white', 'gray.800');
  const featureTextColor = useColorModeValue('gray.600', 'gray.300');

  const features = [
    {
      icon: FaBell,
      title: 'Real-time Notifications',
      description: 'Stay updated with instant notifications about community events and announcements.',
      color: 'blue.500',
    },
    {
      icon: FaUsers,
      title: 'Community Management',
      description: 'Efficiently manage residents, committees, and wardens with role-based access.',
      color: 'green.500',
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Your community data is protected with enterprise-grade security measures.',
      color: 'purple.500',
    },
    {
      icon: FaMobile,
      title: 'Mobile Friendly',
      description: 'Access your community platform from any device, anywhere, anytime.',
      color: 'orange.500',
    },
  ];

  return (
    <Layout title="Home">
      {/* Hero Section */}
      <Box bg={bgGradient} py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
        <Container maxW="container.xl" position="relative" zIndex={2}>
          <VStack spacing={8} textAlign="center" maxW="4xl" mx="auto">
            <Badge colorScheme="brand" fontSize="sm" px={3} py={1} borderRadius="full">
              ✨ Welcome to the future of community communication
            </Badge>
            
            <Heading 
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} 
              fontWeight="extrabold"
              color={heroTextColor}
              lineHeight="shorter"
            >
              Connect Your{' '}
              <Text as="span" color="brand.500">
                Community
              </Text>
            </Heading>
            
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              color={featureTextColor}
              maxW="3xl"
              lineHeight="tall"
            >
              NotifyMe helps apartments, hostels, and clubs streamline communication,
              manage notices, and build stronger communities through digital innovation.
            </Text>

            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} pt={4}>
              <Button
                size="lg"
                colorScheme="brand"
                rightIcon={<Icon as={FaArrowRight} />}
                onClick={() => navigate('/register')}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
                }}
                transition="all 0.2s"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="brand"
                onClick={() => navigate('/login')}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Sign In
              </Button>
            </Stack>
          </VStack>
        </Container>
        
        {/* Background decoration */}
        <Box
          position="absolute"
          top="-50%"
          right="-20%"
          width="40%"
          height="200%"
          bg="brand.100"
          borderRadius="50%"
          opacity={0.1}
          zIndex={1}
          transform="rotate(15deg)"
        />
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '4xl' }} color={heroTextColor}>
              Why Choose NotifyMe?
            </Heading>
            <Text fontSize="lg" color={featureTextColor} maxW="2xl">
              Built specifically for community management with features that matter most
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <Card key={index} bg={featureBg} shadow="md" borderRadius="xl" overflow="hidden">
                <CardBody p={6}>
                  <VStack spacing={4} align="start">
                    <Center
                      w={12}
                      h={12}
                      bg={`${feature.color.split('.')[0]}.50`}
                      borderRadius="lg"
                    >
                      <Icon as={feature.icon} boxSize={6} color={feature.color} />
                    </Center>
                    <Heading size="md" color={heroTextColor}>
                      {feature.title}
                    </Heading>
                    <Text color={featureTextColor} fontSize="sm">
                      {feature.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Featured Notices Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={6} align="stretch">
          <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} textAlign="center" color='gray.700'>
            Featured Notices
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} px={{ base: 4, md: 0 }}>
            {sampleNotices.map((notice, index) => (
              <NoticeCard key={index} {...notice} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Home;

