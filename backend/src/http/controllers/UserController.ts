import { FastifyRequest, FastifyReply } from 'fastify';

import { RegisterUserPayloadType } from '../schemas/UserSchema';

type RegisterUserRequest = FastifyRequest<{ Body: RegisterUserPayloadType }>;

export const registerUserHandler = async (request: RegisterUserRequest, reply: FastifyReply) => {
  const { email, password } = request.body;

  await reply.send({
    email,
    password,
  });
};
