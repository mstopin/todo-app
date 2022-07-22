import React, { useState, useEffect } from 'react';
import {
  Box,
  Collapse,
  useMediaQuery,
} from '@chakra-ui/react';

import TaskBase from './TaskBase'
import TaskPrimarySection from './TaskPrimarySection';
import TaskSecondarySection from './TaskSecondarySection';

import { getTaskColorClassName } from './utils';
import ITask from '../../../../types/Task';

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
    <TaskBase boxShadow={getTaskColorClassName(status)}>
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
    </TaskBase>
  );
}
