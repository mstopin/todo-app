import Database from '../database';
export interface User {
  email: string;
  password: string;
}

const UserModel = Database.getDatabase().collection<User>('users');

export default UserModel;
