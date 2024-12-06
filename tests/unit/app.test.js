// backend/tests/app.test.js
const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

let server;

beforeAll(async () => {
  // Запуск сервера для тестування
  server = app.listen(0, () => {
    console.log(`Test server running on port ${server.address().port}`);
  });

  // Створення тестового користувача
  await User.create({ username: 'testuser', password: 'hashed_password' });
});

afterAll(() => {
  // Закриття сервера після завершення тестів
  server.close();
});

test('should respond with 200 for /api/auth route', async () => {
  const response = await request(app).get('/api/auth');
  expect(response.status).toBe(200);
});

test('should respond with 201 for creating a user', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({ username: 'newUser', password: 'newPassword' });
  
  expect(response.status).toBe(201);
  expect(response.body.username).toBe('newUser');
});

// Додайте інші тести за потреби
