const express = require('express');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Використовуйте змінну оточення

const router = express.Router();

// Middleware для перевірки токена
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Додаємо розшифрований токен в запит
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Головне меню
router.get('/', authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;
