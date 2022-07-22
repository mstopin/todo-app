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

type UpdateTaskRequestProps = Partial<Task> & Pick<Task, '_id'>;

interface UpdateTaskResponse {
  task: Task;
}

export async function updateTask(updateTaskProps: UpdateTaskRequestProps, token: string) {
  const {
    _id,
    content,
    description,
    status,
  } = updateTaskProps;

  const data: any = {};
  if (content) {
    data.content = content;
  }
  if (description) {
    data.description = description;
  }
  if (status) {
    data.status = status;
  }

  const response = await axios.put<UpdateTaskResponse>(`/api/tasks/${_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
