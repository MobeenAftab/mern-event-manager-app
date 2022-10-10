import fetch from 'node-fetch';
import { describe, expect, it } from 'vitest';
import {
  userOne,
  userOneDelete,
  userOneEdit,
  users,
} from '../fixtures/users.mock.data';

describe('Mock integration tests for User Model', async () => {
  const BASE_URL = process.env.VITE_BASE_URL;

  it('should get an array of users', async () => {
    // handler setup, make request and get response
    const user = await fetch(`${BASE_URL}/users/`);
    expect(user).toBeTruthy();
    expect(user.headers.get('content-type')).toBe('application/json');
    const body = await user.json();
    expect(body.length).toEqual(user.length);
    expect(body).toEqual(users);
  });

  it('should get a single user', async () => {
    // handler setup, make request and get response
    const user = await fetch(`${BASE_URL}/users/${userOne.user._id}/`);
    expect(user).toBeTruthy();
    expect(user.headers.get('content-type')).toBe('application/json');
    const body = await user.json();
    expect(body).toEqual(userOne);
  });

  it('should create a user', async () => {
    // handler setup, make request and get response
    const newUser = {
      email: 'createTest@remail1.co.uk',
      firstName: 'Create',
      middleName: 'Me',
      lastName: 'Please',
    };

    const user = await fetch(`${BASE_URL}/users/`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(user).toBeTruthy();
    expect(user.headers.get('content-type')).toBe('application/json');
    const body = await user.json();
    expect(body.user.email).toEqual(newUser.email);
  });

  it('should update an existing user', async () => {
    // handler setup, make request and get response
    const user = await fetch(`${BASE_URL}/users/${userOne.user._id}/`, {
      method: 'patch',
      body: JSON.stringify({ ...userOneEdit }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(user).toBeTruthy();
    expect(user.headers.get('content-type')).toBe('application/json');
    const body = await user.json();
    expect(body).toEqual(userOneEdit);
  });

  it('should delete an existing user', async () => {
    // handler setup, make request and get response
    const user = await fetch(`${BASE_URL}/users/${userOne.user._id}/`, {
      method: 'DELETE',
      body: JSON.stringify({ ...userOne }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(user).toBeTruthy();
    expect(user.headers.get('content-type')).toBe('application/json');
    const body = await user.json();
    expect(body).toEqual(userOneDelete);
  });
});
