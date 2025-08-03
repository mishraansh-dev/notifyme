import React from 'react';
import {
  IconButton,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'md', 
  variant = 'ghost' 
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const tooltipLabel = useColorModeValue('Switch to dark mode', 'Switch to light mode');
  
  return (
    <Tooltip label={tooltipLabel} placement="bottom">
      <IconButton
        aria-label="Toggle color mode"
        icon={<SwitchIcon />}
        onClick={toggleColorMode}
        size={size}
        variant={variant}
        colorScheme="brand"
        _hover={{
          transform: 'scale(1.1)',
        }}
        transition="all 0.2s"
      />
    </Tooltip>
  );
};

export default ThemeToggle;
