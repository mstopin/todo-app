import { FastifyPluginAsync } from 'fastify';

import TaskSchema from '../schemas/TaskSchema';
import TaskController from '../controllers/TaskController';

const TaskRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', {
    onRequest: [fastify.requireJWT],
  }, TaskController.getTasks);

  fastify.get('/:taskId', {
    schema: {
      params: TaskSchema.getTask,
    },
    onRequest: [fastify.requireJWT as any /* workaround for types */]
  }, TaskController.getTask);

  fastify.post('/', {
    schema: {
      body: TaskSchema.createTask,
    },
    onRequest: [fastify.requireJWT as any],
  }, TaskController.createTask);
};

export default TaskRoutes;
