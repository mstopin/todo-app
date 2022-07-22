import useSWR, { mutate } from 'swr';
import { useCallback } from 'react';

import Task from '../types/Task';

import useUser from './useUser';

import {
  getTasks,
  createTask,
  updateTask,
} from '../api/tasks';

type CreateTaskProps = Omit<Task, '_id' | 'status'>;

type UpdateTaskProps = Partial<Task> & Pick<Task, '_id'>;

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

  const updateTaskAndMutateState = useCallback(async (updateTaskProps: UpdateTaskProps) =>{
    if (!token || !tasks || !tasks.data) {
      return;
    }

    await updateTask(updateTaskProps, token);

    const oldTasks = [...tasks.data];
    const updatedTasks = oldTasks.map((task) => {
      if (task._id === updateTaskProps._id) {
        return { ...task, ...updateTaskProps };
      }
      return task;
    });
    tasks.mutate(updatedTasks, { revalidate: true });
  }, [token, tasks]);

  return {
    tasks: tasks ? tasks.data : [],
    createTask: createTaskAndMutateState,
    updateTask: updateTaskAndMutateState,
    isError: !!tasks.error,
  }
}
