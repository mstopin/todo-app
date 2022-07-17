import React from 'react';
import {
  chakra,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import {
  FaPlus,
} from 'react-icons/fa';

import TaskBase from './TaskBase';

const AddTaskButton = chakra('button', {
  baseStyle: {
    display: 'block',
    w: '32px',
    mx: 'auto',
  },
});

const AddTaskIcon = chakra(FaPlus, {
  baseStyle: {
    fontSize: '2xl',
    color: 'text',
    mx: 'auto',
  }
})

export default function CreateTaskButton() {
  return (
    <TaskBase>
      <Flex>
        <Text color="text" fontSize={["lg", null, null, "xl"]}>
          Add new task
        </Text>
        <Spacer />
        <AddTaskButton>
          <AddTaskIcon />
        </AddTaskButton>
      </Flex>
    </TaskBase>
  );
}