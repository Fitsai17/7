const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Маршрут для реєстрації
router.post('/register', UserController.register);

// Маршрут для авторизації
router.post('/login', UserController.login);

module.exports = router;
