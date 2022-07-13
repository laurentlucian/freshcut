import { extendTheme } from '@chakra-ui/react';
import { Button } from './components/Button';
import colors from './colors';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        color: '#EEE6E2',
        bg: '#000000',
        lineHeight: 'base',
      },
      '*::-webkit-scrollbar-track': {
        bg: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: '#3c3941',
        borderRadius: '10px',
        w: '5px',
        h: '5px',
      },
      '*::-webkit-scrollbar': {
        bg: 'transparent',
        w: '5px',
        h: '5px',
      },
    },
  },
  components: {
    Button,
  },
  colors,
  fonts: {
    heading: 'AktivGrotesk, sans-serif',
    body: 'AktivGrotesk, sans-serif',
  },
});

export default theme;
