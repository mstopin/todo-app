import { FastifyRequest, FastifyReply } from 'fastify';

import { RegisterUserPayloadType } from '../schemas/UserSchema';

import UserService from '../services/UserService';

type RegisterUserRequest = FastifyRequest<{ Body: RegisterUserPayloadType }>;

const UserController = {
  registerUser: async (request: RegisterUserRequest, reply: FastifyReply) => {
    try {
      const user = await UserService.registerUser(request.body);
      await reply.send({ data: user });
    } catch (e: any) {
      await reply.status(400).send({ error: e.message });
    }
  },
};

export default UserController;
