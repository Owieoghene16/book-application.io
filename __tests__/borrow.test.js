import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import app from '../app';
import auth from './user.test';

describe('Borrow books', () => {
  it('User should be able to borrow books', async () => {
    const res = await request(app)
      .post('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ message: 'Book has been borrowed succesfully' });
  });

  it('User should be able to return books', async () => {
    const res = await request(app)
      .put('/book/1/borrow')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Book has been returned succesfully' });
  });

  it('User should be able to view books borrowed but not returned', async () => {
    const res = await request(app)
      .get('/book/1/borrow?')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('notReturned');
  });
});
