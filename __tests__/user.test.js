import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import app from '../app';

const auth = {};

describe('Users Endpoint', () => {
  it('Create an user', async () => {
    const res = await request(app)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        userName: 'John',
        email: 'example1@gmail.com',
        password: '12345678',
        reEnterPassword: '12345678',
      });
    auth.token = res.body.token;
    expect(res.body).toHaveProperty('token');
    expect(res.status).toEqual(201);
  });

  it('Valid user can login to their account', async () => {
    const res = await request(app)
      .post('/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'example1@gmail.com',
        password: '12345678',
      });
    auth.token = res.body.token;
    expect(res.body).toHaveProperty('token');
    expect(res.status).toEqual(200);
  });
});

export default auth;
