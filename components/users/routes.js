import userController from './controller.js';
import validationMiddleware from '../../middlewares/validation.js';
import {
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    loginValidator,
    createUserValidator
} from './validator.js';

import express from 'express';
const router = express.Router();

// Create a new user
router.post(['/register', '/'], validationMiddleware(createUserValidator), userController.createUser);
// Login user
router.post('/login', validationMiddleware(loginValidator), userController.loginUser);

// Retrieve all users
router.get('/', userController.getAllUsers);

// Retrieve a single user by id
router.get('/:id', validationMiddleware(getUserValidator), userController.getUserById);

// Update a user by id
router.put('/:id', validationMiddleware(updateUserValidator), userController.updateUserById);

// Delete a user by id
router.delete('/:id', validationMiddleware(deleteUserValidator), userController.deleteUserById);

export default router;
