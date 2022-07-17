import React from 'react';
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import BaseModal from '../BaseModal';

export default function UserRegisterModal() {
  return (
    <BaseModal
      title="Register"
      renderBody={() => (
        <FormControl>
          <Box mb={4}>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              id="email"
              type="email"
            />
          </Box>
          <Box mb={4}>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              id="password"
              type="password"
            />
          </Box>
          <Box mb={4}>
            <FormLabel htmlFor="repeatPassword">Repeat password:</FormLabel>
            <Input
              id="repeatPassword"
              type="password"
            />
          </Box>
        </FormControl>
      )}
      renderFooter={(hideModal) => (
        <Flex justify="end">
          <Button flex="0 1 100px" mr={4} onClick={hideModal}>
            Cancel
          </Button>
          <Button flex="0 1 100px" bg="task.bg">
            Register
          </Button>
        </Flex>
      )}
    />
  );
}
