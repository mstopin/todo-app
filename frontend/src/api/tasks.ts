import axios from 'axios';

import Task from '../types/Task';

const createRequestHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface GetTasksResponse {
  tasks: Task[];
}

export async function getTasks(token: string) {
  const headers = createRequestHeaders(token);
  const response = await axios.get<GetTasksResponse>('/api/tasks', headers);
  return response.data;
}

type CreateTaskRequestProps = Omit<Task, '_id' | 'status'>;

interface CreateTaskResponse {
  task: Task;
}

export async function createTask(createTaskProps: CreateTaskRequestProps, token: string) {
  const headers = createRequestHeaders(token);
  const response = await axios.post<CreateTaskResponse>('/api/tasks', createTaskProps, headers);
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

  const headers = createRequestHeaders(token);
  const response = await axios.put<UpdateTaskResponse>(`/api/tasks/${_id}`, data, headers);
  return response.data;
}

type DeleteTaskRequestProps = Pick<Task, '_id'>;

export async function deleteTask({ _id }: DeleteTaskRequestProps, token: string) {
  const headers = createRequestHeaders(token);
  await axios.delete(`/api/tasks/${_id}`, headers);
}
