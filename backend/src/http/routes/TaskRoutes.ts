import { FastifyPluginAsync } from 'fastify';

import TaskSchema, {
  GetTaskPayloadType,
  CreateTaskPayloadType,
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
      params: TaskSchema.getTask,
    },
    onRequest: [
      fastify.requireJWT<{ Params: GetTaskPayloadType }>()
    ],
  }, TaskController.getTask);

  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/', {
    schema: {
      body: TaskSchema.createTask,
    },
    onRequest: [fastify.requireJWT<{ Body: CreateTaskPayloadType }>()],
  }, TaskController.createTask);
};

export default TaskRoutes;
