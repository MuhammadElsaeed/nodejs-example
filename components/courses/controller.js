
import Course from './model.js';

async function getAllCourses(req, res) {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function createCourse(req, res) {
    try {
        const course = new Course(req.body);
        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) throw new Error('Course not found');
        res.json(course);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function updateCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) throw new Error('Course not found');
        Object.assign(course, req.body);
        const savedCourse = await course.save();
        res.json(savedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteCourseById(req, res) {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) throw new Error('Course not found');
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const Controller = {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById,
};

export default Controller;