import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import app from '../app';
import auth from './user.test';

describe('POST book', () => {
  const filePath1 = `${__dirname}/image/pic.jpg`;
  const filePath2 = `${__dirname}/image/pdf02.pdf`;

  it('Valid Users should be able to create a book', async () => {
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
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('book');
  });

  it('should fail when an invalid user tries to create a book', async () => {
    const res = await request(app)
      .post('/book')
    // Attach the file with key 'file' which is corresponding to your endpoint setting.
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
});

describe('Book permissions', () => {
  it('Users should be able to modify their books', async () => {
    const res = await request(app)
      .post('/book/:id')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token)
      .field('title', 'My last upload')
      .field('author', 'John doe')
      .field('price', '30$')
      .field('description', 'My cats is lovely');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('updatedData');
  });

  it('Users should be able to delete their book', async () => {
    const res = await request(app)
      .delete('/book/1')
      .set('content-type', 'multipart/form-data')
      .set('authorization', auth.token);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'Book has been deleted sucessfully' });
  });
});
