const express = require('express');
const {
  getAllUsers,
  deleteAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
} = require('../controllers/usersController');
const { addUser, login, logout } = require('../controllers/authController');
const { validateUser, sanitizeUser } = require('../middleware/validation');

const router = express.Router();

router.route('/').get(getAllUsers).delete(deleteAllUsers);

router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

router.route('/signup').post(validateUser, sanitizeUser, addUser);

router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;
