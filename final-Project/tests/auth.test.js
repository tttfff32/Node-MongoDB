const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');
const app = require('../app'); 

describe('Auth API', () => {
  test('should register a new user', async () => {
    const res = await request(app)
      .post('api/auth/signup')
      .send({ username: 'testuser', password: '123456', role: 'user' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created');
  });

  test('should login an existing user', async () => {
    const res = await request(app)
      .post('api/auth/login')
      .send({ username: 'testuser', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('api/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
