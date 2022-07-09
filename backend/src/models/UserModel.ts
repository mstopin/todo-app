import { ObjectId } from 'mongodb';

import Database from '../database';
export interface User {
  email: string;
  password: string;
  tasks: ObjectId[];
}

const UserModel = Database.getDatabase().collection<User>('users');

export default UserModel;
