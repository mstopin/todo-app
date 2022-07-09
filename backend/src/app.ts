import fastify from 'fastify';

import Config from './config';

import requireJWT from './plugins/requireJWT';

import UserRoutes from './http/routes/UserRoutes';
import TaskRoutes from './http/routes/TaskRoutes';

export const createAndRunApp = () => {
  const app = fastify();
  app.register(requireJWT);

  app.register(async (fastifyChildInstance) => {
    fastifyChildInstance.register(UserRoutes, { prefix: '/users' });
    fastifyChildInstance.register(TaskRoutes, { prefix: '/tasks' });
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
