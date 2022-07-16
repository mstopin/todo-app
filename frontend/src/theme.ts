import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#F7FAFC',
      },
    },
  },
  colors: {
    text: '#444545',
  },
});

export default theme;
