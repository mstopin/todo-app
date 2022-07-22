export type TaskStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';

export default interface Task {
  _id: string;
  content: string;
  description?: string;
  status: TaskStatus;
}
