import express from 'express';
import userController from './controller.js';
import verifyToken from '../../middlewares/verifyToken.js';
import validationMiddleware from '../../middlewares/validation.js';
import {
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    loginValidator,
    createUserValidator
} from './validator.js';

const router = express.Router();

// Create a new user
router.post(['/register', '/'], validationMiddleware(createUserValidator), userController.createUser);
// Login user
router.post('/login', validationMiddleware(loginValidator), userController.loginUser);

// Retrieve all users

router.get('/', verifyToken, userController.getAllUsers);

// Retrieve a single user by id
router.get('/:id', verifyToken, validationMiddleware(getUserValidator), userController.getUserById);

// Update a user by id
router.put('/:id', verifyToken, validationMiddleware(updateUserValidator), userController.updateUserById);

// Delete a user by id
router.delete('/:id', verifyToken, validationMiddleware(deleteUserValidator), userController.deleteUserById);

export default router;
