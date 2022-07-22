import axios from 'axios';

import Task from '../types/Task';

interface GetTasksResponse {
  tasks: Task[];
}

export async function getTasks(token: string) {
  const response = await axios.get<GetTasksResponse>('/api/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

type CreateTaskRequestProps = Omit<Task, '_id' | 'status'>;

interface CreateTaskResponse {
  task: Task;
}

export async function createTask(createTaskProps: CreateTaskRequestProps, token: string) {
  const response = await axios.post<CreateTaskResponse>('/api/tasks', createTaskProps, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
