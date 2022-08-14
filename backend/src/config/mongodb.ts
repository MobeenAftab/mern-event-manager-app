/**
 * Create singleton instance of mongodb client
 *
 * export client connection and db status
 *
 */

import mongoose, { Mongoose } from 'mongoose';

let dbClient: Mongoose;

export const connectToMongodb = async () => {
  const USERNAME = process.env.MONGO_ROOT_USER ?? 'NA';
  const DBPASS = process.env.MONGO_ROOT_PASSWORD ?? 'NA';
  const DB_NAME = process.env.MONGO_INITDB_DATABASE ?? 'NA';
  const MONGO_HOST = process.env.MONGO_HOST ?? 'mongodb';
  const MONGO_PORT = process.env.MONGO_PORT ?? 'NA';

  const URI =
    process.env.MONGO_DB_CONN_STRING ??
    `mongodb://${USERNAME}:${DBPASS}@${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`;

  console.log(
    `\nmongoose client connected, username: ${USERNAME}, dbname: ${DB_NAME} \n`
  );

  try {
    dbClient = await mongoose.connect(URI);
  } catch (error) {
    throw new Error(`Mongodb connection error \n ${error}`);
  }

  mongoose.connection.on('connected', () => {
    console.log('mongoose connected to db');
  });

  mongoose.connection.on('error', (error) => {
    console.warn('mongoose error:\n' + error);
  });

  mongoose.connection.on('disconected', () => {
    console.warn('mongoose disconected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      mongoose.disconnect();
      printUsageToStdout();
    });
  });

  return dbClient;
};

export const disconnectFromMongodb = async () => {
  if (!dbClient) {
    return;
  }
  mongoose.disconnect();
};

function printUsageToStdout() {
  console.log('Gracefully disonected mongodb');
}
