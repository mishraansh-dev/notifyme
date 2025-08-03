import React from 'react';
import {
  Box,
  Container,
  Flex,
  Text,
  Link,
  VStack,
  HStack,
  Divider,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import { FaHeart, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

interface FooterProps {
  mt?: string | number;
}

const Footer: React.FC<FooterProps> = ({ mt = 'auto' }) => {
  const currentYear = new Date().getFullYear();
  
  // Theme colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const brandColor = useColorModeValue('brand.600', 'brand.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const linkHoverColor = useColorModeValue('brand.600', 'brand.400');

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'FAQ', href: '/faq' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Community', href: '/community' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
      mt={mt}
      py={{ base: 8, md: 12 }}
    >
      <Container maxW="container.xl">
        {/* Main Footer Content */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={{ base: 8, md: 6 }}
          mb={8}
        >
          {/* Brand Section */}
          <VStack align={{ base: 'center', md: 'start' }} spacing={4}>
            <Heading size="lg" color={brandColor}>
              NotifyMe
            </Heading>
            <Text color={textColor} fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
              Simplifying community communication for apartments, hostels, and clubs.
              Stay connected, stay informed.
            </Text>
            <HStack spacing={3}>
              <Link href="#" _hover={{ color: linkHoverColor }}>
                <Icon as={FaTwitter} boxSize={5} color={textColor} />
              </Link>
              <Link href="#" _hover={{ color: linkHoverColor }}>
                <Icon as={FaFacebook} boxSize={5} color={textColor} />
              </Link>
              <Link href="#" _hover={{ color: linkHoverColor }}>
                <Icon as={FaInstagram} boxSize={5} color={textColor} />
              </Link>
              <Link href="#" _hover={{ color: linkHoverColor }}>
                <Icon as={FaLinkedin} boxSize={5} color={textColor} />
              </Link>
            </HStack>
          </VStack>

          {/* Product Links */}
          <VStack align={{ base: 'center', md: 'start' }} spacing={3}>
            <Heading size="sm" color={headingColor} mb={2}>
              Product
            </Heading>
            {footerLinks.product.map((link) => (
              <Link
                key={link.name}
                as={RouterLink}
                to={link.href}
                color={textColor}
                fontSize="sm"
                _hover={{ color: linkHoverColor, textDecoration: 'none' }}
                transition="color 0.2s"
              >
                {link.name}
              </Link>
            ))}
          </VStack>

          {/* Support Links */}
          <VStack align={{ base: 'center', md: 'start' }} spacing={3}>
            <Heading size="sm" color={headingColor} mb={2}>
              Support
            </Heading>
            {footerLinks.support.map((link) => (
              <Link
                key={link.name}
                as={RouterLink}
                to={link.href}
                color={textColor}
                fontSize="sm"
                _hover={{ color: linkHoverColor, textDecoration: 'none' }}
                transition="color 0.2s"
              >
                {link.name}
              </Link>
            ))}
          </VStack>

          {/* Legal Links */}
          <VStack align={{ base: 'center', md: 'start' }} spacing={3}>
            <Heading size="sm" color={headingColor} mb={2}>
              Legal
            </Heading>
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                as={RouterLink}
                to={link.href}
                color={textColor}
                fontSize="sm"
                _hover={{ color: linkHoverColor, textDecoration: 'none' }}
                transition="color 0.2s"
              >
                {link.name}
              </Link>
            ))}
          </VStack>
        </SimpleGrid>

        <Divider borderColor={borderColor} />

        {/* Bottom Section */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          pt={6}
          gap={4}
        >
          <Text color={textColor} fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
            © {currentYear}{' '}
            <Text as="span" color={brandColor} fontWeight="semibold">
              NotifyMe
            </Text>
            . All rights reserved.
          </Text>

          {/* Made with love */}
          <Flex align="center" color={textColor} fontSize="sm">
            <Text>Made with</Text>
            <Icon as={FaHeart} color="red.500" mx={1} boxSize={3} />
            <Text>for better communities</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
