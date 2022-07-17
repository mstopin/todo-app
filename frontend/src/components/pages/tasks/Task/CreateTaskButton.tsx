import React, { useContext } from 'react';
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

import ModalContext, { Modal } from '../../../../modals/ModalContext';

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
  const { showModal } = useContext(ModalContext);

  return (
    <TaskBase>
      <Flex>
        <Text color="text" fontSize={["lg", null, null, "xl"]}>
          Add new task
        </Text>
        <Spacer />
        <AddTaskButton onClick={() => showModal(Modal.TASK_ADD)}>
          <AddTaskIcon />
        </AddTaskButton>
      </Flex>
    </TaskBase>
  );
}