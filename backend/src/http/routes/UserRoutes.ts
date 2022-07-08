import { FastifyPluginAsync } from 'fastify';

import { registerUserSchema } from '../schemas/UserSchema';
import { registerUserHandler } from '../controllers/UserController';

const UserRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', {
    schema: {
      body: registerUserSchema,
    },
  }, registerUserHandler);
};

export default UserRoutes;
