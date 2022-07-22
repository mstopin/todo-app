export type TaskStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';

export default interface Task {
  content: string;
  description?: string;
  status: TaskStatus;
}
