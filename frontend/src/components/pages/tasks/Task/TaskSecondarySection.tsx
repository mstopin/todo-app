import React from 'react';
import {
  chakra,
  Box,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import Task, { TaskStatus } from '../../../../types/Task';

import { getTaskColorClassName } from './utils';

const StatusChangeButton = chakra('button', {
  baseStyle: {
    p: 2,
    flexGrow: 1,
    flexBasis: 0,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '8px',
    bg: 'bg',
    '&:enabled:hover': {
      bg: '#e4eef5',
    },
    '&:disabled': {
      cursor: 'default',
      opacity: '0.5',
    }
  },
});

const StatusText = chakra(Text, {
  baseStyle: {
    fontSize: ['xs', 'sm', null, 'md'],
    fontWeight: 'medium',
    color: 'text',
  },
});

interface TaskSecondarySectionProps {
  task: Omit<Task, 'id' | 'content'> & {
    onUpdate: (status: TaskStatus) => void;
  };
}

export default function TaskSecondarySection({ task }: TaskSecondarySectionProps) {
  const {
    description,
    status,
    onUpdate,
  } = task;

  return (
    <Box>
      <Box mt={4} fontSize={["sm", null, null, "md"]}>
        <Text color="text">
          Description:
        </Text>
        <Text fontWeight="light" color="text">
          {description ?? 'No description'}
        </Text>
      </Box>
      <SimpleGrid mt={4} columns={3} spacing={4} color="text">
        <StatusChangeButton
          borderColor={getTaskColorClassName('NEW')}
          disabled={status === 'NEW'}
          onClick={() => onUpdate('NEW')}
        >
          <StatusText>
            New
          </StatusText>
        </StatusChangeButton>
        <StatusChangeButton
          borderColor={getTaskColorClassName('IN_PROGRESS')}
          disabled={status === 'IN_PROGRESS'}
          onClick={() => onUpdate('IN_PROGRESS')}
        >
          <StatusText>
            In progress
          </StatusText>
        </StatusChangeButton>
        <StatusChangeButton
          borderColor={getTaskColorClassName('COMPLETED')}
          disabled={status === 'COMPLETED'}
          onClick={() => onUpdate('COMPLETED')}
        >
          <StatusText>
            Completed
          </StatusText>
        </StatusChangeButton>
      </SimpleGrid>
    </Box>
  )
}
