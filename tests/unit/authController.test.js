// backend/tests/unit/authController.test.js
const request = require('supertest');
const app = require('../../app');
const { User, sequelize } = require('../../models'); // Імпортуємо вже існуючий екземпляр sequelize

describe('Auth Controller', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Створення тестового користувача
    await User.create({ username: 'testuser', password: 'hashed_password' });
  });

  afterAll(async () => {
    await sequelize.close(); // Закриває з'єднання після тестів
  });

  test('should create a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newuser',
        password: 'newpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('newuser');
  });

  // Інші тести
});
