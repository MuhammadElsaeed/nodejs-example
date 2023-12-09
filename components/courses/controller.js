import Course from './model.js';
import asyncWrapper from '../../middlewares/asyncWrapper.js';
import AppError from '../../utils/appError.js';

const getAllCourses = asyncWrapper(async function (req, res) {
    const { page, limit } = req.query
    const skip = (page - 1) * limit
    const courses = await Course.find({}, { "__v": false }).skip(skip).limit(limit);
    res.status(200).json({
        status: 'success',
        data: { courses: courses }
    });
});

const createCourse = asyncWrapper(async function (req, res) {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json({
        status: 'success',
        data: savedCourse
    });
});

const getCourseById = asyncWrapper(async function (req, res, next) {
    const course = await Course.findById(req.params.id, { "__v": false });
    if (!course) {
        const error = new AppError('Course not found', 404);
        return next(error);
    }
    return res.status(200).json({
        status: 'success',
        data: { course: course }
    });
});

const updateCourseById = asyncWrapper(async function (req, res, next) {
    const { id } = req.params;
    const { body } = req;

    const course = await Course.findByIdAndUpdate(id, body, { new: true }).select({ "-__v": false });
    if (!course) {
        const error = new AppError('Course not found', 404);
        return next(error);
    }
    res.status(200).json({
        status: 'success',
        data: { course: course }
    });
});

const deleteCourseById = asyncWrapper(async function (req, res, next) {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        const error = new AppError('Course not found', 404);
        return next(error);
    }
    res.sendStatus(204);
});

const Controller = {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById,
};

export default Controller;