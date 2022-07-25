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
  FaTrash,
} from 'react-icons/fa';

import Task from '../../../../types/Task';

import { getTaskColorClassName, getTaskStatusDescription } from './utils';

const Button = chakra('button', {
  baseStyle: {
    display: 'block',
  },
});

const IconWrapper = chakra('span', {
  baseStyle: {
    color: 'text',
  },
});

interface TaskPrimarySectionProps {
  task: Omit<Task, 'id' | 'description'> & {
    onDelete: () => void;
  },
  expandable: boolean;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export default function TaskPrimarySection({ task, ...props }: TaskPrimarySectionProps) {
  const {
    content,
    status,
    onDelete,
  } = task;

  const {
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
      <Flex align="center">
        <Button onClick={onDelete}>
          <IconWrapper fontSize={["lg", "xl"]} opacity="0.75" transition="ease-in-out 0.2s" sx={{ '&:hover': { opacity: '1', color: 'red.500' }}}>
            <FaTrash />
          </IconWrapper>
        </Button>
        {expandable && (
          <Button ml={4} onClick={toggleExpanded}>
            <Text as="span" transition="ease-in-out 0.2s" transform={isExpanded ? 'rotate(-180deg)' : ''}>
              <IconWrapper w={32} fontSize="3xl">
                <FaAngleDown />
              </IconWrapper>
            </Text>
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
