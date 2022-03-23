import request from 'supertest';
import {
  beforeAll, describe, expect, it,
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

describe('Borrow book endpoint', () => {
  it('User should be able to borrow a book', async () => {
    const res = await request(app)
      .post('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ message: 'Book has been borrowed succesfully' });
  });

  it('Should fail if no token is passes', async () => {
    const res = await request(app)
      .post('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', '');
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'A token is required for authentication' });
  });
});

describe('Return book', () => {
  it('User should be able to return books', async () => {
    const res = await request(app)
      .put('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Book has been returned succesfully' });
  });

  it('Should fail if no token is passes to the header', async () => {
    const res = await request(app)
      .put('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', '');
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'A token is required for authentication' });
  });
});

describe('Return book endpoints', () => {
  it('User should be able to view books borrowed but not returned', async () => {
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
