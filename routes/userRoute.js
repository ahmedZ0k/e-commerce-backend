const express = require('express');

const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  changeUserPasswordValidator,
} = require('../utils/validatores/userValidator');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require('../controllers/userController');

const router = express.Router();

router.patch(
  '/changePassword/:id',
  changeUserPasswordValidator,
  changeUserPassword,
);

router.route('/').get(getAllUsers).post(createUserValidator, createUser);

router
  .route('/:id')
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
