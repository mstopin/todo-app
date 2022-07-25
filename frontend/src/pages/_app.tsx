import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import ModalContainer from '../modals/ModalContainer';

import { ModalContextProvider } from '../hooks/useModals';
import { UserContextProvider } from '../hooks/useUser';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <ModalContextProvider>
          <Component {...pageProps} />
          <ModalContainer />
        </ModalContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
}
