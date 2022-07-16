import React from 'react';
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

export default function HeaderUserMenu() {
  return (
    <Box>
      <Menu>
        <MenuButton display="block" fontSize="xl" color="gray.600">
          <FaUser />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Text>Login</Text>
          </MenuItem>
          <MenuItem>
            <Text>Register</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
