import { FastifyPluginAsync } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import UserSchema from '../schemas/UserSchema';
import UserController from '../controllers/UserController';

const UserRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/me', {
    onRequest: [
      fastify.requireJWT(),
    ],
  }, UserController.getUser);
  
  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/register', {
    schema: {
      body: UserSchema.registerUser,
    },
  }, UserController.registerUser);

  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/login', {
    schema: {
      body: UserSchema.loginUser,
    },
  }, UserController.loginUser);
};

export default UserRoutes;
