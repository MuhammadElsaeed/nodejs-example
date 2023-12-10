import courseController from './controller.js';
import verifyToken from '../../middlewares/verifyToken.js';
import validationMiddleware from '../../middlewares/validation.js';
import {
    getCourseValidator,
    createCourseValidator,
    updateCourseValidator,
    deleteCourseValidator
} from './validator.js';

import express from 'express';
const router = express.Router();

// Create a new course
router.post('/',verifyToken,  validationMiddleware(createCourseValidator), courseController.createCourse);

// Retrieve all courses
router.get('/',verifyToken,  courseController.getAllCourses);

// Retrieve a single course by id
router.get('/:id',verifyToken,  validationMiddleware(getCourseValidator), courseController.getCourseById);

// Update a course by id
router.put('/:id',verifyToken,  validationMiddleware(updateCourseValidator), courseController.updateCourseById);

// Delete a course by id
router.delete('/:id',verifyToken,  validationMiddleware(deleteCourseValidator), courseController.deleteCourseById);

export default router;
