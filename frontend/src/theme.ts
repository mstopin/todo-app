import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'bg',
      },
    },
  },
  fonts: {
    body: 'roboto; sans-serif',
    poppins: 'poppins; sans-serif',
  },
  fontSizes: {
    xxs: '0.625rem',
  },
  colors: {
    bg: '#F7FAFC',
    text: '#444545',
    task: {
      bg: '#D2E3EE',
      new: '#00B007',
      in_progress: '#FFA800',
      completed: '#0066FF',
    }
  },
  shadows: {
    task: {
      new: 'inset 3px 0 var(--chakra-colors-task-new)',
      in_progress: 'inset 3px 0 var(--chakra-colors-task-in_progress)',
      completed: 'inset 3px 0 var(--chakra-colors-task-completed)',
    },
  },
});

export default theme;
