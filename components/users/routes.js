import multer from 'multer';
import express from 'express';
import userController from './controller.js';
import AppError from '../../utils/appError.js';
import verifyToken from '../../middlewares/verifyToken.js';
import validationMiddleware from '../../middlewares/validation.js';
import {
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    loginValidator,
    createUserValidator
} from './validator.js';

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const randomHexString = Math.random().toString(16).substring(2);
        const fileName = `${randomHexString}.${file.originalname.split('.').pop()}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError('Only jpeg, jpg and png format allowed!', 400), false);
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter: fileFilter
});

const router = express.Router();

// Create a new user
router.post(['/register', '/'], upload.single("avatar"), validationMiddleware(createUserValidator), userController.createUser);
// Login user
router.post('/login', validationMiddleware(loginValidator), userController.loginUser);

// Retrieve all users

router.get('/', verifyToken, userController.getAllUsers);

// Retrieve a single user by id
router.get('/:id', verifyToken, validationMiddleware(getUserValidator), userController.getUserById);

// Update a user by id
router.put('/:id', verifyToken,upload.single("avatar"), validationMiddleware(updateUserValidator), userController.updateUserById);

// Delete a user by id
router.delete('/:id', verifyToken, validationMiddleware(deleteUserValidator), userController.deleteUserById);

export default router;
