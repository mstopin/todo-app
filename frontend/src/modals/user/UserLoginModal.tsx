import React from 'react';

import {
  Box,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import BaseModal, { BaseModalHeader, BaseModalBody, BaseModalFooter } from '../BaseModal';

interface UserLoginModalProps {
  onClose: () => void;
}

export default function UserLoginModal({ onClose }: UserLoginModalProps) {
  return (
    <BaseModal onClose={onClose}>
      <BaseModalHeader title="Login" />
      <BaseModalBody>
        <Box>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              id="email"
              type="email"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              id="password"
              type="password"
            />
          </FormControl>
        </Box>
      </BaseModalBody>
      <BaseModalFooter>
        <Flex justify="end">
          <Button flex="0 1 100px" mr={4} onClick={onClose}>
            Cancel
          </Button>
          <Button flex="0 1 100px" bg="task.bg">
            Login
          </Button>
        </Flex>
      </BaseModalFooter>
    </BaseModal>
  )
}
