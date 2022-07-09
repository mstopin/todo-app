import { FastifyPluginAsync } from 'fastify';

import UserSchema from '../schemas/UserSchema';
import UserController from '../controllers/UserController';

const UserRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', {
    schema: {
      body: UserSchema.registerUser,
    },
  }, UserController.registerUser);
};

export default UserRoutes;
