import request from 'supertest';
import {
  beforeAll, describe, expect, test,
} from '@jest/globals';
import app from '../app';
import auth from './user.test';
import db from '../database/database';

beforeAll(async () => {
  await db.book.destroy({
    where: {},
    truncate: true,
  });
});

describe('create book endpoint', () => {
  const filePath1 = `${__dirname}/image/pic.jpg`;
  const filePath2 = `${__dirname}/image/pdf02.pdf`;

  test('should fail when an invalid user tries to create a book', async () => {
    const res = await request(app)
      .post('/api/book')
      .set('content-type', 'multipart/form-data')
      .set('authorization', '')
      .field('title', 'My first upload')
      .field('author', 'John')
      .field('price', '40$')
      .field('description', 'My cats')
      .attach('file', filePath1)
      .attach('file', filePath2);
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'A token is required for authentication' });
  });

  test('should fail when an invalid token is passed to the header', async () => {
    const res = await request(app)
      .post('/api/book')
      .set('content-type', 'multipart/form-data')
      .set('authorization', 'invalidToken')
      .field('title', 'My first upload')
      .field('author', 'John')
      .field('price', '40$')
      .field('description', 'My cats')
      .attach('file', filePath1)
      .attach('file', filePath2);
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'Invalid Token' });
  });

  test('should fail if the first filePath isnt an image file', async () => {
    const res = await request(app)
      .post('/api/book')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token)
      .field('title', 'My first upload')
      .field('author', 'John')
      .field('price', '40$')
      .field('description', 'I live at lagos, Nigeria')
      .attach('file', filePath2)
      .attach('file', filePath2);
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({
      message: 'Only image files are allowed',
    });
  });

  test('should fail if the second filePath isnt a pdf file', async () => {
    const res = await request(app)
      .post('/api/book')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token)
      .field('title', 'My first upload')
      .field('author', 'John')
      .field('price', '40$')
      .field('description', 'I live at lagos, Nigeria')
      .attach('file', filePath1)
      .attach('file', filePath1);
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({
      message: 'Only pdf files are allowed',
    });
  });

  test('valid users should be able to create a book', async () => {
    const res = await request(app)
      .post('/api/book')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token)
      .field('title', 'My first upload')
      .field('author', 'John')
      .field('price', '40$')
      .field('description', 'I live at lagos, Nigeria')
      .attach('file', filePath1)
      .attach('file', filePath2);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      message: 'Book Created Succesfully',
    });
  });
});

describe('book permissions', () => {
  test('users should be able to modify their books', async () => {
    const res = await request(app)
      .post('/api/book/:id')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token)
      .field('title', 'My last upload')
      .field('author', 'John doe')
      .field('price', '30$')
      .field('description', 'My cats is lovely');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      message: 'Book updated sucessfully',
    });
  });

  test('users should be able to view all their books', async () => {
    const res = await request(app)
      .post('/api/user/book')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('books');
  });

  test('users should be able to delete their book', async () => {
    const res = await request(app)
      .delete('/api/book/1')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Book has been deleted sucessfully' });
  });
});
