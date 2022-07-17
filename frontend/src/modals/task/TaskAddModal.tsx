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

export default function TaskAddModal() {
  return (
    <BaseModal
      title="Add new task"
      renderBody={() => (
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
      )}
      renderFooter={(hideModal) => (
        <Flex justify="end">
          <Button flex="0 1 100px" mr={4} onClick={hideModal}>
            Cancel
          </Button>
          <Button flex="0 1 100px" bg="task.bg">
            Add task
          </Button>
        </Flex>
      )}
    />
  );
}
