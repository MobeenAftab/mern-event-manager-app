import fetch from 'node-fetch';
import { describe, expect, it } from 'vitest';
import {
  deleteWorkoutOne,
  workoutOne,
  workoutOneEdit,
  workouts,
} from '../fixtures/workout.mock.data';

describe('Mock integration tests for Workout Model', async () => {
  const BASE_URL = process.env.VITE_BASE_URL;

  it('should get an array of workouts', async () => {
    // handler setup, make request and get response
    const wk = await fetch(`${BASE_URL}/workouts/`);
    expect(wk).toBeTruthy();
    expect(wk.headers.get('content-type')).toBe('application/json');
    const body = await wk.json();
    expect(body.length).toEqual(wk.length);
    expect(body).toEqual(workouts);
  });

  it('should get a single workout', async () => {
    // handler setup, make request and get response
    const wk = await fetch(`${BASE_URL}/workouts/${workoutOne.workout._id}/`);
    expect(wk).toBeTruthy();
    expect(wk.headers.get('content-type')).toBe('application/json');
    const body = await wk.json();
    expect(body).toEqual(workoutOne);
  });

  it('should create a workout', async () => {
    // handler setup, make request and get response
    const newWk = { load: 2, reps: 1, title: 'Bench Press' };

    const wk = await fetch(`${BASE_URL}/workouts/`, {
      method: 'POST',
      body: JSON.stringify(newWk),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(wk).toBeTruthy();
    expect(wk.headers.get('content-type')).toBe('application/json');
    const body = await wk.json();
    expect(body.workout.title).toEqual(newWk.title);
  });

  it('should update an existing workout', async () => {
    // handler setup, make request and get response
    const wk = await fetch(`${BASE_URL}/workouts/${workoutOne.workout._id}/`, {
      method: 'patch',
      body: JSON.stringify({ ...workoutOneEdit }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(wk).toBeTruthy();
    expect(wk.headers.get('content-type')).toBe('application/json');
    const body = await wk.json();
    expect(body).toEqual(workoutOneEdit);
  });

  it('should delete an existing workout', async () => {
    // handler setup, make request and get response
    const wk = await fetch(`${BASE_URL}/workouts/${workoutOne.workout._id}/`, {
      method: 'DELETE',
      body: JSON.stringify({ ...workoutOne }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(wk).toBeTruthy();
    expect(wk.headers.get('content-type')).toBe('application/json');
    const body = await wk.json();
    expect(body).toEqual(deleteWorkoutOne);
  });
});
