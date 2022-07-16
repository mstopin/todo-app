import React from 'react';
import {
  chakra,
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Collapse,
  useBoolean,
} from '@chakra-ui/react';
import {
  FaAngleDown,
} from 'react-icons/fa';

type TaskStatusKey = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';

interface TaskProps {
  content: string;
  description?: string;
  status: TaskStatusKey;
};

const getTaskStatusDescription = (taskStatusKey: TaskStatusKey) => {
  if (taskStatusKey === 'IN_PROGRESS') {
    return 'IN PROGRESS';
  }
  return taskStatusKey.toUpperCase();
}

const getTaskColorClassName = (taskStatuskey: TaskStatusKey) => {
  return `task.${taskStatuskey.toLowerCase()}`;
}

const AngleDownIcon = chakra(FaAngleDown, {
  baseStyle: {
    margin: 'auto',
    fontSize: '3xl',
  },
});

const ActionButton = chakra(Button, {
  baseStyle: {
    px: '4',
    py: '2',
    flexGrow: '1',
    flexBasis: '0',
    h: 'auto',
    borderWidth: '2px',
    borderStyle: 'solid',
    bg: 'bg',
    '&:active, &:hover': {
      bg: 'bg',
    },
  },
});

export default function Task({ content, description, status }: TaskProps) {
  const [expanded, setExpanded] = useBoolean(false);

  return (
    <Box mb={4} py={1.5} px={3} borderRadius={8} bg="task.bg" boxShadow={getTaskColorClassName(status)}>
      <Flex>
        <Box>
          <Text color="text" fontSize="lg">
            {content}
          </Text>
          <Text color={getTaskColorClassName(status)} fontSize="xs" fontWeight="bold">
            {getTaskStatusDescription(status)}
          </Text>
        </Box>
        <Spacer />
        <Flex align="center" justify="end">
          <Button display="block" fontSize="xl" bg="none" p={0} _active={{ bg: 'none' }} _hover={{ bg: 'none' }} onClick={setExpanded.toggle}>
            <Text transition="ease-in-out 0.2s" transform={expanded ? 'rotate(-180deg)' : ''}>
              <AngleDownIcon />
            </Text>
          </Button>
        </Flex>
      </Flex>
      <Collapse in={expanded}>
        <Box mt={4}>
          <Text fontSize="sm" color="text">
            Description:
          </Text>
          <Text fontSize="sm" fontWeight="light" color="text">
            {description ?? 'No description'}
          </Text>
        </Box>
        <Flex align="center" mt={4} color="text">
          <ActionButton mr={4} borderColor={getTaskColorClassName('NEW')} disabled={status === 'NEW'}>
            <Text fontSize="xs">
              New
            </Text>
          </ActionButton>
          <ActionButton mr={4} borderColor={getTaskColorClassName('IN_PROGRESS')} disabled={status === 'IN_PROGRESS'}>
            <Text fontSize="xs">
              In progress
            </Text>
          </ActionButton>
          <ActionButton borderColor={getTaskColorClassName('COMPLETED')} disabled={status === 'COMPLETED'}>
            <Text fontSize="xs">
              Completed
            </Text>
          </ActionButton>
        </Flex>
      </Collapse>
    </Box>
  );
}
