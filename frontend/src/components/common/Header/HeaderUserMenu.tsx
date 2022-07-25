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

interface HeaderUserMenu {
  isLoggedIn: boolean;
  onLogIn: () => void;
  onLogOut: () => void;
  onRegister: () => void;
}

export default function HeaderUserMenu(props: HeaderUserMenu) {
  const {
    isLoggedIn,
    onLogIn,
    onLogOut,
    onRegister,
  } = props;

  return (
    <Box>
      <Menu autoSelect={false}>
        <MenuButton aria-label="User options" display="block" fontSize={["2xl", null, "3xl"]} color="text">
          <FaUser />
        </MenuButton>
        <MenuList>
          {isLoggedIn && (
            <MenuItem onClick={onLogOut}>
              <Text color="text">
                Log out
              </Text>
            </MenuItem>
          )}
          {!isLoggedIn && (
            <>
              <MenuItem onClick={onLogIn}>
                <Text color="text">
                  Log in
                </Text>
              </MenuItem>
              <MenuItem onClick={onRegister}>
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
