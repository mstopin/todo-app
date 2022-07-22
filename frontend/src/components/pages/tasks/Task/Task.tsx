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
import TaskType from '../../../../types/Task';

type TaskProps = TaskType;

export default function Task({ _id, content, description, status }: TaskProps) {
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
        _id={_id}
        content={content}
        status={status}
        expandable={!mustBeExpanded}
        isExpanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
      />
      <Collapse in={mustBeExpanded || expanded}>
        <TaskSecondarySection
          _id={_id}
          description={description}
          status={status}
        />
      </Collapse>
    </TaskBase>
  );
}
