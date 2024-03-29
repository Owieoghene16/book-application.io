import request from 'supertest';
import {
  beforeAll, describe, expect, test,
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
    const res = await request(app)
      .post('/api/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ message: 'Book borrowed succesfully' });
  });

  test('should fail if no token is passes', async () => {
    const res = await request(app)
      .post('/api/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', '');
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'A token is required for authentication' });
  });
});

describe('return book', () => {
  test('user should be able to return books', async () => {
    const res = await request(app)
      .put('/api/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Book returned succesfully' });
  });

  test('should fail if no token is passes to the header', async () => {
    const res = await request(app)
      .put('/api/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', '');
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'A token is required for authentication' });
  });
});

describe('return book endpoints', () => {
  test('user should be able to view books borrowed but not returned', async () => {
    const res = await request(app)
      .get('/api/book/1/borrow?')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('notReturned');
  });
});
