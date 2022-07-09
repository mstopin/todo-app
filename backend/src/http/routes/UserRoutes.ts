import { FastifyPluginAsync } from 'fastify';

import UserSchema from '../schemas/UserSchema';
import UserController from '../controllers/UserController';

const UserRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/register', {
    schema: {
      body: UserSchema.registerUser,
    },
  }, UserController.registerUser);

  fastify.post('/login', {
    schema: {
      body: UserSchema.loginUser,
    },
  }, UserController.loginUser);
};

export default UserRoutes;
