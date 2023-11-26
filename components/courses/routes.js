import courseController from './controller.js';
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
router.post('/', validationMiddleware(createCourseValidator), courseController.createCourse);

// Retrieve all courses
router.get('/', courseController.getAllCourses);

// Retrieve a single course by id
router.get('/:id', validationMiddleware(getCourseValidator), courseController.getCourseById);

// Update a course by id
router.put('/:id', validationMiddleware(updateCourseValidator), courseController.updateCourseById);

// Delete a course by id
router.delete('/:id', validationMiddleware(deleteCourseValidator), courseController.deleteCourseById);

export default router;
