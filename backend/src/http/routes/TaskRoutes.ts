import { FastifyPluginAsync } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import {
  TaskParamsSchema,
  TaskBodySchema,
  GetTaskParamsPayloadType,
  CreateTaskBodyPayloadType,
  UpdateTaskParamsPayloadType,
  UpdateTaskBodyPayloadType,
  DeleteTaskParamsPayloadType,
} from '../schemas/TaskSchema';
import TaskController from '../controllers/TaskController';

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

  fastify.withTypeProvider<TypeBoxTypeProvider>().delete('/:taskId', {
    schema: {
      params: TaskParamsSchema.deleteTask,
    },
    onRequest: [
      fastify.requireJWT<{ Params: DeleteTaskParamsPayloadType }>(),
    ],
  }, TaskController.deleteTask);
};

export default TaskRoutes;
