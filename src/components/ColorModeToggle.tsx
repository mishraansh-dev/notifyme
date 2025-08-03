import React from 'react';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

interface ColorModeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
}

const ColorModeToggle: React.FC<ColorModeToggleProps> = ({
  size = 'md',
  variant = 'ghost',
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const label = useColorModeValue('Switch to dark mode', 'Switch to light mode');

  return (
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={toggleColorMode}
      variant={variant}
      size={size}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.700'),
      }}
    />
  );
};

export default ColorModeToggle;
