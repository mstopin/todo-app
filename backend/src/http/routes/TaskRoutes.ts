import { FastifyPluginAsync } from 'fastify';

import {
  TaskParamsSchema,
  TaskBodySchema,
  GetTaskParamsPayloadType,
  CreateTaskBodyPayloadType,
  UpdateTaskParamsPayloadType,
  UpdateTaskBodyPayloadType,
} from '../schemas/TaskSchema';
import TaskController from '../controllers/TaskController';

import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const TaskRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/', {
    onRequest: [
      fastify.requireJWT<{ Body: Record<string, never> }>()
    ],
  }, TaskController.getTasks);

  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/:taskId', {
    schema: {
      params: TaskParamsSchema.getTask,
    },
    onRequest: [
      fastify.requireJWT<{ Params: GetTaskParamsPayloadType }>()
    ],
  }, TaskController.getTask);

  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/', {
    schema: {
      body: TaskBodySchema.createTask,
    },
    onRequest: [
      fastify.requireJWT<{ Body: CreateTaskBodyPayloadType }>()
    ],
  }, TaskController.createTask);

  fastify.withTypeProvider<TypeBoxTypeProvider>().put('/:taskId', {
    schema: {
      params: TaskParamsSchema.updateTask,
      body: TaskBodySchema.updateTask,
    },
    onRequest: [
      fastify.requireJWT<{
        Params: UpdateTaskParamsPayloadType,
        Body: UpdateTaskBodyPayloadType
      }>(),
    ],
  }, TaskController.updateTask);
};

export default TaskRoutes;
