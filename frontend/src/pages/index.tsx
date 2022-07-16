import React from 'react';
import { 
  Box,
  Text
} from '@chakra-ui/react';

import Header from '../components/common/Header';

import Task from '../components/pages/tasks/Task';

export default function Index() {
  return (
    <Box maxW="1200px" mx="auto">
      <Header />
      <Box px={3} mt={6} mb={-4}>
        <Text fontFamily="poppins" fontSize="3xl" fontWeight="medium" color="text">
          My tasks:
        </Text>
        <Box mt={4}>
          <Task content="Do the dishes" status='NEW' />
          <Task content="Do the dishes" status='IN_PROGRESS' />
          <Task content="Do the dishes" status='COMPLETED' />
        </Box>
      </Box>
    </Box>
  );
}
