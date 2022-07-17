export type TaskStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  content: string;
  description?: string;
  status: TaskStatus;
}
