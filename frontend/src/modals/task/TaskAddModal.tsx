import React from 'react';
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import BaseModal, { BaseModalHeader, BaseModalBody, BaseModalFooter } from '../BaseModal';

interface TaskAddModalProps {
  onClose: () => void;
}

export default function TaskAddModal({ onClose }: TaskAddModalProps) {
  return (
    <BaseModal onClose={onClose}>
      <BaseModalHeader title="Add new task" />
      <BaseModalBody>
        <FormControl>
          <Box mb={4}>
            <FormLabel htmlFor="name">Task name:</FormLabel>
            <Input
              id="name"
              type="text"
            />
          </Box>
          <Box mb={4}>
            <FormLabel htmlFor="description">Task description:</FormLabel>
            <Input
              id="description"
              type="text"
            />
          </Box>
        </FormControl>
      </BaseModalBody>
      <BaseModalFooter>
        <Flex justify="end">
          <Button flex="0 1 100px" mr={4} onClick={onClose}>
            Cancel
          </Button>
          <Button flex="0 1 100px" bg="task.bg">
            Add task
          </Button>
        </Flex>
      </BaseModalFooter>
    </BaseModal>
  );
}
