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
      <Menu autoSelect={false}>
        <MenuButton display="block" fontSize={["2xl", null, "3xl"]} color="text">
          <FaUser />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Text color="text">
              Login
            </Text>
          </MenuItem>
          <MenuItem>
            <Text color="text">
              Register
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
