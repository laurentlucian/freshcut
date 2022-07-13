import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import Fonts from '../lib/fonts';
import React from 'react';
import theme from 'lib/theme';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
