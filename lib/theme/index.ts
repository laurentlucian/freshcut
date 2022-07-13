import { extendTheme } from '@chakra-ui/react';
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';
import { Button } from './components/Button';
import colors from './colors';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        fontFamily: 'body',
        color: mode('#000000', '#EEE6E2')(props),
        bg: mode('#EEE6E2', '#000000')(props),
        lineHeight: 'base',
      },
    }),
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
