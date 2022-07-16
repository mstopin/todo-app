import React from 'react';
import {
  Box,
  Flex,
  Spacer,
} from '@chakra-ui/react';

import HeaderLogo from './HeaderLogo';
import HeaderUserMenu from './HeaderUserMenu';

export default function Header() {
  return (
    <Box px={4} py={2}>
      <Flex alignItems="center">
        <HeaderLogo />
        <Spacer />
        <HeaderUserMenu />
      </Flex>
    </Box>
  );
}