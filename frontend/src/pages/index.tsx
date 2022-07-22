import React from 'react';
import {
  Box,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import Header from '../components/common/Header';
import Task, { CreateTaskButton } from '../components/pages/tasks/Task';

import useTasks from '../hooks/useTasks';

export default function Index() {
  const { tasks } = useTasks();

  return (
    <Box maxW="992px" mx="auto">
      <Header />
      <Box px={3} mt={[6, 8, 16, 20]}>
        <Text fontFamily="poppins" fontSize={["3xl", null, null, "4xl"]} fontWeight="medium" color="text">
          My tasks:
        </Text>
        <Box mt={4} maxW={["480px", "none"]}>
          <SimpleGrid columns={[1, null, 2]} spacing={4}>
            {tasks && tasks.map((task) => (
              <Task content={task.content} description={task.description} status={task.status} key={task._id} />
            ))}
            <CreateTaskButton />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
