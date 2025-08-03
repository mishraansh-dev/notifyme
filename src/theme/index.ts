import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Define color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

// Define custom colors
const colors = {
  brand: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  accent: {
    50: '#E0F2F1',
    100: '#B2DFDB',
    200: '#80CBC4',
    300: '#4DB6AC',
    400: '#26A69A',
    500: '#009688',
    600: '#00897B',
    700: '#00796B',
    800: '#00695C',
    900: '#004D40',
  },
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

// Define custom fonts
const fonts = {
  heading: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  body: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

// Define custom component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'lg',
    },
    sizes: {
      lg: {
        fontSize: 'md',
        px: 8,
        py: 3,
      },
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          transform: 'translateY(-1px)',
          boxShadow: 'lg',
        },
        _active: {
          bg: 'brand.700',
          transform: 'translateY(0)',
        },
      },
      outline: {
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
          transform: 'translateY(-1px)',
          boxShadow: 'md',
        },
      },
      ghost: {
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
          transform: 'translateY(-1px)',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        boxShadow: 'md',
        _hover: {
          boxShadow: 'lg',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s',
      },
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          borderRadius: 'lg',
          borderColor: 'gray.300',
          _hover: {
            borderColor: 'brand.300',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
    },
  },
  FormLabel: {
    baseStyle: {
      fontWeight: 'semibold',
      color: 'gray.700',
    },
  },
};

// Define global styles
const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800',
    },
    '*': {
      borderColor: 'gray.200',
    },
  },
};

// Create the theme
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
  shadows: {
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
  },
  radii: {
    xl: '1rem',
    '2xl': '1.5rem',
  },
});

export default theme;
