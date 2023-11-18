import Course from './model.js';

async function getAllCourses(req, res) {
    try {
        const courses = await Course.find();
        res.status(200).json({
            status: 'success',
            data: { courses: courses }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

async function createCourse(req, res) {
    try {
        const course = new Course(req.body);
        const savedCourse = await course.save();
        res.status(201).json({
            status: 'success',
            data: savedCourse
        });
    } catch (error) {
        console.log("Erorrr " + error.name);
        res.status(500).json({
            status: 'error',
            data: {
                message: error.message
            }
        });
    }
}

async function getCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            return res.status(200).json({
                status: 'success',
                data: { course: course }
            });
        }
        res.status(404).json({
            status: 'fail',
            data: {
                message: 'Course not found',
                course: null
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

async function updateCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) throw new Error('Course not found');
        Object.assign(course, req.body);
        const savedCourse = await course.save();
        res.status(200).json({
            status: 'success',
            data: { course: savedCourse }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: {
                message: error.message
            }
        });
    }
}

async function deleteCourseById(req, res) {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    message: 'Course not found'
                }
            });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: {
                message: error.message
            }
        });
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