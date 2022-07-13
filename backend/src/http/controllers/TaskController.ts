import { ObjectId } from 'mongodb';
import { FastifyRequest, FastifyReply } from 'fastify';

import {
  GetTaskParamsPayloadType,
  CreateTaskBodyPayloadType,
  UpdateTaskParamsPayloadType,
  UpdateTaskBodyPayloadType,
  DeleteTaskParamsPayloadType,
} from '../schemas/TaskSchema';

import TaskService from '../services/TaskService';

type GetTasksRequest = FastifyRequest;
type GetTaskRequest = FastifyRequest<{ Params: GetTaskParamsPayloadType }>;
type CreateTaskRequest = FastifyRequest<{ Body: CreateTaskBodyPayloadType }>;
type UpdateTaskRequest = FastifyRequest<{
  Params: UpdateTaskParamsPayloadType,
  Body: UpdateTaskBodyPayloadType,
}>;
type DeleteTaskRequest = FastifyRequest<{ Params: DeleteTaskParamsPayloadType }>;

const TaskController = {
  getTasks: async (request: GetTasksRequest, reply: FastifyReply) => {
    try {
      const userId = new ObjectId(request.user.id);
      const tasks = await TaskService.getTasks(userId);
      await reply.send({ tasks });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  getTask: async (request: GetTaskRequest, reply: FastifyReply) => {
    try {
      const userId = new ObjectId(request.user.id);
      const taskId = new ObjectId(request.params.taskId);
      const task = await TaskService.getTask(userId, taskId);
      await reply.send({ task });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  createTask: async (request: CreateTaskRequest, reply: FastifyReply) => {
    try {
      const userId = new ObjectId(request.user.id);
      const task = await TaskService.createTask(userId, request.body);
      await reply.status(201).send({ task });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  updateTask: async (request: UpdateTaskRequest, reply: FastifyReply) => {
    try {
      const userId = new ObjectId(request.user.id);
      const taskId = new ObjectId(request.params.taskId);
      const task = await TaskService.updateTask(userId, taskId, request.body);
      await reply.status(200).send({ task });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  deleteTask: async (request: DeleteTaskRequest, reply: FastifyReply) => {
    try {
      const userId = new ObjectId(request.user.id);
      const taskId = new ObjectId(request.params.taskId);
      await TaskService.deleteTask(userId, taskId);
      await reply.status(204).send();
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },
};

export default TaskController;
