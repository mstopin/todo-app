import React from 'react';
import {
  chakra,
  Box,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import { getTaskColorClassName } from './utils';
import Task from '../../../../types/Task';

import useTasks from '../../../../hooks/useTasks';

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

type TaskSecondarySectionProps = Omit<Task, 'content'>;

export default function TaskSecondarySection({ _id, description, status }: TaskSecondarySectionProps) {
  const { updateTask } = useTasks();

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
          onClick={() => updateTask({ _id, status: 'NEW' })}
        >
          <StatusText>
            New
          </StatusText>
        </StatusChangeButton>
        <StatusChangeButton
          borderColor={getTaskColorClassName('IN_PROGRESS')}
          disabled={status === 'IN_PROGRESS'}
          onClick={() => updateTask({ _id, status: 'IN_PROGRESS' })}
        >
          <StatusText>
            In progress
          </StatusText>
        </StatusChangeButton>
        <StatusChangeButton
          borderColor={getTaskColorClassName('COMPLETED')}
          disabled={status === 'COMPLETED'}
          onClick={() => updateTask({ _id, status: 'COMPLETED' })}
        >
          <StatusText>
            Completed
          </StatusText>
        </StatusChangeButton>
      </SimpleGrid>
    </Box>
  )
}
