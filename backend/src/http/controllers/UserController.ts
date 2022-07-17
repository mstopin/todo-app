import { ObjectId } from 'mongodb';
import { FastifyRequest, FastifyReply } from 'fastify';

import { LoginUserPayloadType, RegisterUserPayloadType } from '../schemas/UserSchema';

import UserService from '../services/UserService';

type RegisterUserRequest = FastifyRequest<{ Body: RegisterUserPayloadType }>;
type LoginUserRequest = FastifyRequest<{ Body: LoginUserPayloadType }>;
type GetUserRequest = FastifyRequest;

const UserController = {
  registerUser: async (request: RegisterUserRequest, reply: FastifyReply) => {
    try {
      const user = await UserService.registerUser(request.body);
      await reply.send({ data: user });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  loginUser: async (request: LoginUserRequest, reply: FastifyReply) => {
    try {
      const token = await UserService.loginUser(request.body);
      await reply.send({ token });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },

  getUser: async (request: GetUserRequest, reply: FastifyReply) => {
    try {
      const userId = new ObjectId(request.user.id);
      const user = await UserService.getUser(userId);
      await reply.send({
        user: {
          _id: user._id,
          email: user.email,
        },
      });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },
};

export default UserController;
