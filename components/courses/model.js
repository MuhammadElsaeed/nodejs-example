import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    students: {
        type: [String],
        default: []
    }
});


const Course = mongoose.model('Course', courseSchema);

export default Course;
