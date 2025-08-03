import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  VStack,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
  Flex,
  Card,
  CardBody,
  HStack,
  Center,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../store/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, accent.50)',
    'linear(to-br, gray.900, gray.800)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate authentication logic - in a real app this would be an API call
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Extract name from email (before @) and determine role
      const emailUsername = email.split('@')[0];
      const displayName = emailUsername.split('.').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
      
      // Determine role based on email or keywords
      let role: 'user' | 'org' | 'warden' = 'user';
      if (email.includes('admin') || email.includes('committee')) {
        role = 'org';
      } else if (email.includes('warden')) {
        role = 'warden';
      }
      
      const userData = {
        id: `${role}-${Date.now()}`,
        name: displayName,
        email: email,
      };
      
      login(role, userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient={bgGradient}>
      <Container maxW="md" py={12}>
        <Card shadow="2xl" borderRadius="2xl" bg={cardBg}>
          <CardBody p={8}>
            <VStack spacing={8} align="stretch">
              {/* Header */}
              <VStack spacing={2} textAlign="center">
                <Heading
                  size="xl"
                  color={headingColor}
                  fontWeight="bold"
                >
                  Welcome back
                </Heading>
                <Text color={textColor} fontSize="md">
                  Sign in to your NotifyMe account
                </Text>
              </VStack>

              {/* Error Alert */}
              {error && (
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              <Box as="form" onSubmit={handleSubmit}>
                <Stack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Email address</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        size="lg"
                        focusBorderColor="brand.500"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color={textColor}>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        size="lg"
                        focusBorderColor="brand.500"
                      />
                      <InputRightElement h="full">
                        <IconButton
                          variant="ghost"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                          size="sm"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    fontSize="md"
                    fontWeight="semibold"
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    _hover={{
                      transform: 'translateY(-1px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Box>

              {/* Register Link */}
              <VStack spacing={2}>
                <Text color={textColor} fontSize="sm">
                  Don't have an account?{' '}
                  <Link
                    as={RouterLink}
                    to="/register"
                    color="brand.500"
                    fontWeight="semibold"
                    _hover={{
                      color: 'brand.600',
                      textDecoration: 'underline',
                    }}
                  >
                    Register here
                  </Link>
                </Text>

                <Link
                  as={RouterLink}
                  to="/"
                  color="brand.500"
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{
                    color: 'brand.600',
                    textDecoration: 'underline',
                  }}
                >
                  ← Back to Home
                </Link>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Flex>
  );
};

export default Login;

