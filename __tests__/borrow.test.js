import request from 'supertest';
import {
  beforeAll, afterAll, describe, expect, test,
} from '@jest/globals';
import app from '../app';
import auth from './user.test';
import db from '../database/database';

beforeAll(async () => {
  await db.borrow.destroy({
    where: {},
    truncate: true,
  });
});

describe('borrow book endpoint', () => {
  test('user should be able to borrow a book', async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ message: 'Book has been borrowed succesfully' });
  });

  test('should fail if no token is passes', async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', '');
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'A token is required for authentication' });
  });
});

describe('return book', () => {
  test('user should be able to return books', async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .put('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Book has been returned succesfully' });
  });

  test('should fail if no token is passes to the header', async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .put('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', '');
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'A token is required for authentication' });
  });
});

describe('return book endpoints', () => {
  test('user should be able to view books borrowed but not returned', async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .get('/book/1/borrow?')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    const { notReturned } = res.body;
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('notReturned');
    expect(res.body).toEqual({ notReturned });
  });
});

afterAll(async () => {
  await app.close();
});
