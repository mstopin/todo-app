import React from 'react';
import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import Header from '../components/common/Header';

import Task from '../components/pages/tasks/Task';

export default function Index() {
  return (
    <Box maxW="992px" mx="auto">
      <Header />
      <Box px={3} mt={[6, 8, 16, 20]}>
        <Text fontFamily="poppins" fontSize={["3xl", null, null, "4xl"]} fontWeight="medium" color="text">
          My tasks:
        </Text>
        <Box mt={4} maxW={["480px", "none"]}>
          <SimpleGrid columns={[1, null, 2]} spacing={4}>
            <Task content="Do the dishes" status='NEW' />
            <Task content="Do the dishes" status='IN_PROGRESS' />
            <Task content="Do the dishes" status='COMPLETED' />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
