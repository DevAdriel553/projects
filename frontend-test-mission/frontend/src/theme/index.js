import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: '#e3f9f5',
      500: '#0BC5EA',
      600: '#00B5D8',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'xl',
      },
    },
  },
});

export default theme;
