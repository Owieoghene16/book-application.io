import request from 'supertest';
import {
  beforeAll, describe, expect, it,
} from '@jest/globals';
import app from '../app';
import db from '../database/database';

const auth = {};

beforeAll(async () => {
  await db.user.destroy({
    where: {},
    truncate: true,
  });
});

describe('Users Endpoint', () => {
  it('Should fail if a user doesnt fill the form throughly', async () => {
    const res = await request(app)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        userName: 'John',
        email: 'example1@gmail.com',
        password: '12345678',
        reEnterPassword: '',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'Fill the form throughly' });
  });

  it('Should fail if the password length is not 8 or above', async () => {
    const res = await request(app)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        userName: 'John',
        email: 'example1@gmail.com',
        password: '123456',
        reEnterPassword: '123456',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'Length of password must be 8 or above' });
  });

  it('Should fail if the first password doesnt match the second password', async () => {
    const res = await request(app)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        userName: 'John',
        email: 'example1@gmail.com',
        password: '12345678',
        reEnterPassword: '1234',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'reEnter Password' });
  });

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

  it('Should fail if user email has already been registered', async () => {
    const res = await request(app)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        userName: 'John',
        email: 'example1@gmail.com',
        password: '12345678',
        reEnterPassword: '12345678',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'Email already registered' });
  });
});

describe('User login endpoint', () => {
  it('Should fail if form isnt fill throughly', async () => {
    const res = await request(app)
      .post('/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'example1@gmail.com',
        password: '',
      });
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({
      message: 'Fill the form throughly',
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
    expect(res.body).toHaveProperty('token');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      message: 'Login successful',
      token,
    });
  });

  it('Should fail if email does not exist in the database', async () => {
    const res = await request(app)
      .post('/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'example2@gmail.com',
        password: '12345678',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      message: 'User does not exist',
    });
  });

  it('Should fail if password is incorrect', async () => {
    const res = await request(app)
      .post('/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'example1@gmail.com',
        password: '12345',
      });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      message: 'Invalid Password',
    });
  });
});

export default auth;
