import fastify from 'fastify';
import fastifyJWT from '@fastify/jwt';

import Config from './config';

import UserRoutes from './http/routes/UserRoutes';

export const createAndRunApp = () => {
  const app = fastify();

  app.register(fastifyJWT, {
    secret: Config.get('JWT_SECRET'),
  });

  app.register(async (fastifyChildInstance) => {
    fastifyChildInstance.register(UserRoutes, { prefix: '/users' });
  }, { prefix: '/api' });

  app.listen({
    host: '0.0.0.0',
    port: Number(Config.get('APP_PORT')),
  }, (err, addr) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log(`Server is running at ${addr}`);
  });
};
