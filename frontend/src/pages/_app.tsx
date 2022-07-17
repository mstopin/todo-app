import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import ModalContainer from '../modals/ModalContainer';
import { ModalContextProvider } from '../modals/ModalContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ModalContextProvider>
        <Component {...pageProps} />
        <ModalContainer />
      </ModalContextProvider>
    </ChakraProvider>
  );
}
