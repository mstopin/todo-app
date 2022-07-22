import React, { useContext } from 'react';
import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  FaUser,
} from 'react-icons/fa';

import ModalContext, { Modal } from '../../../modals/ModalContext';

import useUser from '../../../hooks/useUser';

export default function HeaderUserMenu() {
  const user = useUser();
  const { showModal } = useContext(ModalContext);

  return (
    <Box>
      <Menu autoSelect={false}>
        <MenuButton display="block" fontSize={["2xl", null, "3xl"]} color="text">
          <FaUser />
        </MenuButton>
        <MenuList>
          {user.token && (
            <MenuItem onClick={user.logOut}>
              <Text color="text">
                Log out
              </Text>
            </MenuItem>
          )}
          {!user.token && (
            <>
              <MenuItem onClick={() => showModal(Modal.USER_LOGIN)}>
                <Text color="text">
                  Login
                </Text>
              </MenuItem>
              <MenuItem onClick={() => showModal(Modal.USER_REGISTER)}>
                <Text color="text">
                  Register
                </Text>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
}
