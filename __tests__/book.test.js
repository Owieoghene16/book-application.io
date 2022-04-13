import request from 'supertest';
import {
  beforeAll, afterAll, describe, expect, test,
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
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/book')
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
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/book')
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
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/book')
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
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/book')
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
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/book')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token)
      .field('title', 'My first upload')
      .field('author', 'John')
      .field('price', '40$')
      .field('description', 'I live at lagos, Nigeria')
      .attach('file', filePath1)
      .attach('file', filePath2);
    const { book } = res.body;
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('book');
    expect(res.body).toEqual({
      message: 'Uploaded succesfully',
      book,
    });
  });
});

describe('book permissions', () => {
  test('users should be able to modify their books', async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/book/:id')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token)
      .field('title', 'My last upload')
      .field('author', 'John doe')
      .field('price', '30$')
      .field('description', 'My cats is lovely');
    const { updatedData } = res.body;
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('updatedData');
    expect(res.body).toEqual({ updatedData });
  });

  test('users should be able to view all their books', async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .post('/user/book')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    const { books } = res.body;
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('books');
    expect(res.body).toEqual({ books });
  });

  test('users should be able to delete their book', async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .delete('/book/1')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Book has been deleted sucessfully' });
  });
});

afterAll(async () => {
  await app.close();
});
