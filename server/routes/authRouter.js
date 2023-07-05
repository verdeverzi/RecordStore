const express = require('express');
const { addUser, login, logout } = require('../controllers/authController');
const { validateUser, sanitizeUser } = require('../middleware/validation');

const router = express.Router();

router.route('/signup').post(validateUser, sanitizeUser, addUser);

router.route('/login').post(login);

router.route('/logout').get(logout);

module.exports = router;
