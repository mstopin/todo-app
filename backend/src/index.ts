import { createAndRunApp } from './app';

import Database from './database';

const bootstrapApp = async () => {
  await Database.connect();
};

(async () => {
  await bootstrapApp();
  createAndRunApp();
})().catch(console.error);
