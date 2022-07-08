import Database from '../database';

export type TaskStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  title: string;
  content: string;
  status: TaskStatus;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  tasks: Task[];
}

const UserModel = Database.getDatabase().collection<User>('users');

export default UserModel;
