import { ObjectId } from 'mongodb';

import Database from '../database';

export type TaskStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  ownerId: ObjectId;
  content: string;
  description: string | null;
  status:  TaskStatus;
}

const TaskModel = Database.getDatabase().collection<Task>('tasks');

export default TaskModel;
