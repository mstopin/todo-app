import { ObjectId } from 'mongodb';

import UserModel from '../../models/UserModel';
import TaskModel from '../../models/TaskModel';

interface CreateTaskDTO {
  content: string;
  description?: string;
}

const TaskService = {
  getTasks: async (userId: ObjectId) => {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw new Error('User does not exist');
    }

    return await TaskModel.find({
      ownerId: user._id,
    }).toArray();
  },

  getTask: async (userId: ObjectId, taskId: ObjectId) => {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw new Error('User does not exist');
    }

    const task = await TaskModel.findOne({
      ownerId: userId,
      _id: taskId,
    });
    if (!task) {
      throw new Error('Task does not exist');
    }

    return task;
  },

  createTask: async (userId: ObjectId, createTaskDTO: CreateTaskDTO) => {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw new Error('User does not exist');
    }
    
    const { content, description } = createTaskDTO;

    const { insertedId: insertedTaskId } = await TaskModel.insertOne({
      ownerId: userId,
      content,
      description: description ?? null,
      status: 'NEW',
    });

    return {
      _id: insertedTaskId,
      ownerId: userId,
      content,
      description: description ?? null,
      status: 'NEW',
    };
  }
};

export default TaskService;
