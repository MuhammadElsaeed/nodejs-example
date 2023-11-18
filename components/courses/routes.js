import courseController from './controller.js';
import validationMiddleware from '../../middlewares/validation.js';
import Schema from './schema.js';

import express from 'express';
const router = express.Router();

// Create a new course
router.post('/', validationMiddleware(Schema), courseController.createCourse);

// Retrieve all courses
router.get('/', courseController.getAllCourses);

// Retrieve a single course by id
router.get('/:id', courseController.getCourseById);

// Update a course by id
router.put('/:id', validationMiddleware(Schema), courseController.updateCourseById);

// Delete a course by id
router.delete('/:id', courseController.deleteCourseById);

export default router;
