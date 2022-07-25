import React, { useState, useEffect, useCallback } from 'react';
import {
  Collapse,
  useMediaQuery,
} from '@chakra-ui/react';

import TaskType, { TaskStatus } from '../../../../types/Task';

import useTasks from '../../../../hooks/useTasks';

import TaskBase from './TaskBase'
import TaskPrimarySection from './TaskPrimarySection';
import TaskSecondarySection from './TaskSecondarySection';

import { getTaskColorClassName } from './utils';

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const [expanded, setExpanded] = useState(false);
  const [mustBeExpanded] = useMediaQuery('(min-width: 48em)');

  const { updateTask, deleteTask } = useTasks();

  const onTaskUpdate = useCallback((status: TaskStatus) => {
    updateTask({
      _id: task._id,
      status
    });
  }, [updateTask, task._id]);

  const onTaskDelete = useCallback(() => {
    deleteTask({
      _id: task._id
    });
  }, [deleteTask, task._id]);

  useEffect(() => {
    if (!mustBeExpanded) {
      setExpanded(false);
    }
  }, [mustBeExpanded]);

  return (
    <TaskBase boxShadow={getTaskColorClassName(task.status)}>
      <TaskPrimarySection
        task={{
          ...task,
          onDelete: onTaskDelete,
        }}
        expandable={!mustBeExpanded}
        isExpanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
      />
      <Collapse in={mustBeExpanded || expanded}>
        <TaskSecondarySection
          task={{
            ...task,
            onUpdate: onTaskUpdate,
          }}
        />
      </Collapse>
    </TaskBase>
  );
}
