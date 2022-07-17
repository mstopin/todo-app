import React from 'react';
import {
  chakra,
  Box,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import {
  FaAngleDown,
} from 'react-icons/fa';

import { getTaskColorClassName } from './utils';
import { Task, TaskStatus } from './types';

const getTaskStatusDescription = (taskStatus: TaskStatus) => {
  if (taskStatus === 'IN_PROGRESS') {
    return 'IN PROGRESS';
  }
  return taskStatus.toUpperCase();
}

const ExpandButton = chakra('button', {
  baseStyle: {
    display: 'block',
    w: '32px',
  }
})

const ExpandIcon = chakra(FaAngleDown, {
  baseStyle: {
    fontSize: '3xl',
    color: 'text',
  },
});

interface TaskPrimarySectionProps extends Omit<Task, 'description'> {
  expandable: boolean;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export default function TaskPrimarySection(props: TaskPrimarySectionProps) {
  const {
    content,
    status,
    expandable,
    isExpanded,
    toggleExpanded,
  } = props;

  return (
    <Flex>
      <Box>
        <Text color="text" fontSize={["lg", null, null, "xl"]}>
          {content}
        </Text>
        <Text color={getTaskColorClassName(status)} fontSize={["xs", null, null, "sm"]} fontWeight="bold">
          {getTaskStatusDescription(status)}
        </Text>
      </Box>
      <Spacer />
      {expandable && (
        <ExpandButton onClick={toggleExpanded}>
          <Text transition="ease-in-out 0.2s" transform={isExpanded ? 'rotate(-180deg)' : ''}>
            <ExpandIcon />
          </Text>
        </ExpandButton>
      )}
    </Flex>
  );
}
