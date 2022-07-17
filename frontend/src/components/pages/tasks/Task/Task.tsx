import React, { useState, useEffect } from 'react';
import {
  Box,
  Collapse,
  useMediaQuery,
} from '@chakra-ui/react';

import TaskPrimarySection from './TaskPrimarySection';
import TaskSecondarySection from './TaskSecondarySection';

import { getTaskColorClassName } from './utils';
import { Task as ITask } from './types';

type TaskProps = ITask;

export default function Task({ content, description, status }: TaskProps) {
  const [expanded, setExpanded] = useState(false);
  const [mustBeExpanded] = useMediaQuery('(min-width: 48em)');

  useEffect(() => {
    if (!mustBeExpanded) {
      setExpanded(false);
    }
  }, [mustBeExpanded]);

  return (
    <Box py={[1.5, 3.5]} px={[3, 4]} borderRadius={8} bg="task.bg" boxShadow={getTaskColorClassName(status)}>
      <TaskPrimarySection
        content={content}
        status={status}
        expandable={!mustBeExpanded}
        isExpanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
      />
      <Collapse in={mustBeExpanded || expanded}>
        <TaskSecondarySection
          description={description}
          status={status}
        />
      </Collapse>
    </Box>
  );
}
