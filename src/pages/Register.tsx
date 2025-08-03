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

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
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

    // Basic validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
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
                  Create your account
                </Heading>
                <Text color={textColor} fontSize="md">
                  Join the NotifyMe community
                </Text>
              </VStack>

              {/* Error Alert */}
              {error && (
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              {/* Register Form */}
              <Box as="form" onSubmit={handleSubmit}>
                <Stack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Full Name</FormLabel>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      size="lg"
                      focusBorderColor="brand.500"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color={textColor}>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      size="lg"
                      focusBorderColor="brand.500"
                    />
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

                  <FormControl isRequired>
                    <FormLabel color={textColor}>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        size="lg"
                        focusBorderColor="brand.500"
                      />
                      <InputRightElement h="full">
                        <IconButton
                          variant="ghost"
                          aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                          icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    loadingText="Creating account..."
                    _hover={{
                      transform: 'translateY(-1px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Create Account
                  </Button>
                </Stack>
              </Box>

              {/* Login Link */}
              <VStack spacing={2}>
                <Text color={textColor} fontSize="sm">
                  Already have an account?{' '}
                  <Link
                    as={RouterLink}
                    to="/login"
                    color="brand.500"
                    fontWeight="semibold"
                    _hover={{
                      color: 'brand.600',
                      textDecoration: 'underline',
                    }}
                  >
                    Sign in here
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

export default Register;

