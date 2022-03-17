import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import app from '../app';

const auth = {};

describe('Users Endpoint', () => {
  it('Create a user', async () => {
    const res = await request(app)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        userName: 'John',
        email: 'example1@gmail.com',
        password: '12345678',
        reEnterPassword: '12345678',
      });
    const { token } = res.body;
    auth.token = token;
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toEqual({
      message: 'User created successfully',
      token,
    });
  });

  it('Valid user can login to their account', async () => {
    const res = await request(app)
      .post('/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'example1@gmail.com',
        password: '12345678',
      });
    const { token } = res.body;
    auth.token = token;
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toEqual({
      message: 'Login successful',
      token,
    });
  });
});

export default auth;
