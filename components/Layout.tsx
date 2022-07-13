import { Box, Flex, HStack } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode } from 'react';
import Link from './Link';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Freshcut' }: Props) => {
  return (
    <Flex justify="center">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon.png" />
      </Head>
      {children}
    </Flex>
  );
};

export default Layout;