import useSWR, { mutate } from 'swr';
import { useCallback } from 'react';

import Task from '../types/Task';

import useUser from './useUser';

import {
  getTasks,
  createTask,
} from '../api/tasks';

type CreateTaskProps = Omit<Task, '_id' | 'status'>;

export default function useTasks() {
  const { token } = useUser();
  const tasks = useSWR(token ? ['/api/tasks', token] : null, async (_, token) => {
    const response = await getTasks(token);
    return response.tasks;
  });

  const createTaskAndMutateState = useCallback(async (createTaskProps: CreateTaskProps) => {
    if (!token || !tasks) {
      return;
    }

    const newTask = (await createTask(createTaskProps, token)).task;
    const oldTasks = tasks.data ?? [];

    const mutatedTasks = [...oldTasks, newTask];
    tasks.mutate(mutatedTasks, { revalidate: true });
  }, [token, tasks]);

  return {
    tasks: tasks ? tasks.data : [],
    createTask: createTaskAndMutateState,
    isError: !!tasks.error,
  }
}
