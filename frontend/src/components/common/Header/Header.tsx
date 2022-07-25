import React, { useCallback } from 'react';
import {
  Box,
  Flex,
  Spacer,
} from '@chakra-ui/react';

import useUser from '../../../hooks/useUser';
import useModals, { Modal } from '../../../hooks/useModals';

import HeaderLogo from './HeaderLogo';
import HeaderUserMenu from './HeaderUserMenu';

export default function Header() {
  const { token, logOut: onLogOut } = useUser();
  const { showModal } = useModals();

  const onLogIn = useCallback(() => showModal(Modal.USER_LOGIN), [showModal]);
  const onRegister = useCallback(() => showModal(Modal.USER_REGISTER), [showModal]);

  return (
    <Box px={3} py={3}>
      <Flex alignItems="center">
        <HeaderLogo />
        <Spacer />
        <HeaderUserMenu
          isLoggedIn={!!token}
          onLogIn={onLogIn}
          onLogOut={onLogOut}
          onRegister={onRegister}
        />
      </Flex>
    </Box>
  );
}