import mongoose from 'mongoose';
import fetch from 'node-fetch';
import { beforeAll, describe, expect, it } from 'vitest';
import { connectToMongodb } from '../../src/config/mongodb';
import { workoutOne } from '../fixtures/workout.mock.data';

describe('Mock integration tests for Workout Model', async () => {
  const BASE_URL = 'http://localhost:3000/v1';

  it('should get a workout', async () => {
    // handler setup, make request and get response
    const wk = await fetch(`${BASE_URL}/workouts/`);
    expect(wk).toBeTruthy();
    expect(wk.headers.get('content-type')).toBe('application/json');
    const body = await wk.json();
    expect(body).toEqual(workoutOne);
  });
});

describe('Integration test with db and server', () => {
  beforeAll(async () => {
    await connectToMongodb();
  });
  it('should connect to the test db', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
