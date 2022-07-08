import { MongoClient } from 'mongodb';

import Config from '../config';

export default class Database {
  private static client = new MongoClient(Config.get('DATABASE_URL'), {
    auth: {
      username: Config.get('DATABASE_USERNAME'),
      password: Config.get('DATABASE_PASSWORD'),
    },
  });

  public static async connect() {
    await Database.client.connect();
  }

  public static getClient() {
    return Database.client;
  }

  public static getDatabase() {
    const databaseName = Config.get('DATABASE_NAME');
    return Database.client.db(databaseName);
  }
}
