import mongoose from 'mongoose';
import { beforeAll, describe, expect, it } from 'vitest';
import { connectToMongodb } from '../../src/config/mongodb';

/**
 * TODO:
 *  Test the mongodb connection.
 *  After connection is established can test data flow from TS to server to MongoDb and back.
 */
describe('Integration test with db and server', () => {
  beforeAll(async () => {
    await connectToMongodb();
  });
  it.skip('should connect to the test db', () => {
    expect(mongoose.connection.readyState).toBe(1);
  }, 50000);
});
