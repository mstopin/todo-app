import {
  FastifyPluginAsync,
  onRequestAsyncHookHandler,
  FastifyRequest,
  FastifyReply,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RequestGenericInterface,
  FastifySchema,
} from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyJWT from '@fastify/jwt';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import Config from '../config';
declare module "fastify" {
  interface FastifyInstance {
    requireJWT<RequestInterface extends RequestGenericInterface>(): onRequestAsyncHookHandler<
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      RequestInterface,
      unknown,
      FastifySchema,
      TypeBoxTypeProvider
    >;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: string;
    };
  }
}

const requireJWT: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyJWT, {
    secret: Config.get('JWT_SECRET'),
  });

  fastify.decorate('requireJWT', () => async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch {
      await reply.status(401).send({ error: 'Unauthorized' });
    }
  });
};

export default fastifyPlugin(requireJWT);
