import fastify from 'fastify';

import Config from './config';

export const createAndRunApp = () => {
  const app = fastify();

  app.listen({ port: Number(Config.get('APP_PORT')) }, (err, addr) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log(`Server is running at ${addr}`);
  });
};
