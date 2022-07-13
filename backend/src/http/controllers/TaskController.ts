import { ObjectId } from 'mongodb';
import { FastifyRequest, FastifyReply } from 'fastify';

import {
  GetTaskParamsPayloadType,
  CreateTaskBodyPayloadType,
  UpdateTaskParamsPayloadType,
  UpdateTaskBodyPayloadType,
} from '../schemas/TaskSchema';

import TaskService from '../services/TaskService';

type GetTasksRequest = FastifyRequest;
type GetTaskRequest = FastifyRequest<{ Params: GetTaskParamsPayloadType }>;
type CreateTaskRequest = FastifyRequest<{ Body: CreateTaskBodyPayloadType }>;
type UpdateTaskRequest = FastifyRequest<{
  Params: UpdateTaskParamsPayloadType,
  Body: UpdateTaskBodyPayloadType,
}>;

const TaskController = {
  getTasks: async (request: GetTasksRequest, reply: FastifyReply) => {
    const userId = new ObjectId(request.user.id);
    try {
      const tasks = await TaskService.getTasks(userId);
      await reply.send({ tasks });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  getTask: async (request: GetTaskRequest, reply: FastifyReply) => {
    const userId = new ObjectId(request.user.id);
    const taskId = new ObjectId(request.params.taskId);
    try {
      const task = await TaskService.getTask(userId, taskId);
      await reply.send({ task });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  createTask: async (request: CreateTaskRequest, reply: FastifyReply) => {
    const userId = new ObjectId(request.user.id);
    try {
      const task = await TaskService.createTask(userId, request.body);
      await reply.status(201).send({ task });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  updateTask: async (request: UpdateTaskRequest, reply: FastifyReply) => {
    const userId = new ObjectId(request.user.id);
    const taskId = new ObjectId(request.params.taskId);
    try {
      const task = await TaskService.updateTask(userId, taskId, request.body);
      await reply.status(200).send({ task });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },
};

export default TaskController;
