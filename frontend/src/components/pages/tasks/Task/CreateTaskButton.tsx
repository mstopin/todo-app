import React, { useContext, useMemo } from 'react';
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

import useUser from '../../../../hooks/useUser';

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
  const { token } = useUser();
  const { showModal } = useContext(ModalContext);

  const onTaskAddClick = useMemo(() => {
    if (!token) {
      return () => showModal(Modal.USER_LOGIN);
    }
    return () => showModal(Modal.TASK_ADD);
  }, [token, showModal]);

  return (
    <TaskBase>
      <Flex>
        <Text color="text" fontSize={["lg", null, null, "xl"]}>
          Add new task
        </Text>
        <Spacer />
        <AddTaskButton onClick={onTaskAddClick}>
          <AddTaskIcon />
        </AddTaskButton>
      </Flex>
    </TaskBase>
  );
}