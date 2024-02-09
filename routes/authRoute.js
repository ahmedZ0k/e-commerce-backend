const express = require('express');

const {
  signupValidator,
  loginValidator,
} = require('../utils/validatores/authValidator');

const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);

// router
//   .route('/:id')
//   .get(getUserValidator, getUser)
//   .patch(updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;
