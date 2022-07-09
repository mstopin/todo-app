import { FastifyRequest, FastifyReply } from 'fastify';

import { RegisterUserPayloadType } from '../schemas/UserSchema';

type RegisterUserRequest = FastifyRequest<{ Body: RegisterUserPayloadType }>;

const UserController = {
  registerUser: async (request: RegisterUserRequest, reply: FastifyReply) => {
    const { email, password } = request.body;

    await reply.send({
      email,
      password,
    });
  },
};

export default UserController;
