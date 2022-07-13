import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import fetcher from '../lib/fetch';
import Fonts from '../lib/fonts';
import React from 'react';
import theme from 'lib/theme';

const MyApp = ({ Component, pageProps }) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   // Example for including static props in a Next.js function component page.
//   // Don't forget to include the respective types for any props passed into
//   // the component.
//   const items: User[] = sampleUserData;
//   return { props: { items } };
// };

export default MyApp;
