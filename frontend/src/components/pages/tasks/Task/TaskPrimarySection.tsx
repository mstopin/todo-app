import React from 'react';
import {
  chakra,
  Box,
  Flex,
  Spacer,
  Text,
  Button,
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

const AngleDownIcon = chakra(FaAngleDown, {
  baseStyle: {
    margin: 'auto',
    fontSize: '3xl',
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
        <Flex align="center" justify="end">
          <Button display="block"  bg="none" p={0} _active={{ bg: 'none' }} _hover={{ bg: 'none' }} onClick={toggleExpanded}>
            <Text transition="ease-in-out 0.2s" transform={isExpanded ? 'rotate(-180deg)' : ''}>
              <AngleDownIcon />
            </Text>
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
