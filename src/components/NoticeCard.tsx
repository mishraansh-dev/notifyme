import React from 'react';
import { Box, Text, Flex, HStack, Badge } from '@chakra-ui/react';

interface NoticeCardProps {
  title: string;
  description: string;
  timestamp: Date;
  tag?: string;
  author?: string;
  isPinned?: boolean;
  className?: string;
  onCardClick?: () => void;
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  title,
  description,
  timestamp,
  tag,
  author,
  isPinned = false,
  className,
  onCardClick,
}) => {
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getTagColor = (tagName?: string) => {
    if (!tagName) return '';
    const colors = {
      'Block A': 'bg-blue-100 text-blue-800',
      'Block B': 'bg-green-100 text-green-800',
      'Block C': 'bg-purple-100 text-purple-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Emergency': 'bg-red-100 text-red-800',
      'Event': 'bg-indigo-100 text-indigo-800',
      'General': 'bg-gray-100 text-gray-800',
    };
    return colors[tagName as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
<Box
      bg="white"
      rounded="lg"
      shadow="lg"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'xl' }}
      cursor="pointer"
      onClick={onCardClick}
    >
      {isPinned && (
        <Box bg="brand.50" px={4} py={2} borderBottomWidth="1px" borderColor="brand.200">
          <HStack spacing={2} color="brand.700" fontWeight="medium">
            <svg
              width="16"
              height="16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            Pinned Notice
          </HStack>
        </Box>
      )}

      <Box p={6}>
        <Flex justify="space-between" align="start" mb={4}>
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            {title}
          </Text>
          {tag && (
            <Badge
              px={2}
              py={1}
              bg={getTagColor(tag)}
              color='gray.800'
              rounded="full"
              textTransform="capitalize"
            >
              {tag}
            </Badge>
          )}
        </Flex>
        <Text color="gray.600" noOfLines={3} mb={4}>
          {description}
        </Text>
        <Flex justify="space-between" align="center" color="gray.500" fontSize="sm">
          <HStack spacing={2}>
            <svg height="16" width="16" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <Text>{formatTimestamp(timestamp)}</Text>
          </HStack>
          {author && (
            <HStack spacing={2}>
              <svg height="16" width="16" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <Text>By {author}</Text>
            </HStack>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default NoticeCard;
