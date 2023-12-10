import bcrypt from 'bcrypt';
import User from './model.js';
import jwt from 'jsonwebtoken';
import AppError from '../../utils/appError.js';
import asyncWrapper from '../../middlewares/asyncWrapper.js';

const getAllUsers = asyncWrapper(async function (req, res) {
    const { page, limit } = req.query
    const skip = (page - 1) * limit
    const users = await User.find({}, { "__v": false, "password": false })
        .skip(skip).limit(limit);
    res.status(200).json({
        status: 'success',
        data: { users: users }
    });
});

const loginUser = asyncWrapper(async function (req, res, next) {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email }, { "__v": false });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
        const error = new AppError('Invalid email or password', 401);
        return next(error);
    }
    const token = jwt.sign(user.toObject({
        transform: ({ _id, firstName, lastName, email }) => {
            return { _id, firstName, lastName, email }
        }
    }), process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Login successful', token
        }
    });
});



const createUser = asyncWrapper(async function (req, res, next) {
    const { firstName, lastName, password, email } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new AppError('User with the same email already exists', 400);
        return next(error);
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
    const savedUser = await user.save();
    res.status(201).json({
        status: 'success',
        data: savedUser.toObject({ versionKey: false, password: false })
    });
});

const getUserById = asyncWrapper(async function (req, res, next) {
    const user = await User.findById(req.params.id, { "__v": false, "password": false });
    if (!user) {
        const error = new AppError('User not found', 404);
        return next(error);
    }
    return res.status(200).json({
        status: 'success',
        data: { user: user }
    });
});

const updateUserById = asyncWrapper(async function (req, res, next) {
    const { id } = req.params;
    const { body } = req;
    body.password = await bcrypt.hash(body.password, 10);
    // Check if the new email is already used by another user
    if (body.email) {
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser && existingUser._id.toString() !== id) {
            const error = new AppError('Email is already used by another user', 400);
            return next(error);
        }
    }

    const user = await User.findByIdAndUpdate(id, body, { new: true })
        .select({ "-__v": false, password: false });
    if (!user) {
        const error = new AppError('User not found', 404);
        return next(error);
    }
    res.status(200).json({
        status: 'success',
        data: { user: user }
    });
});

const deleteUserById = asyncWrapper(async function (req, res, next) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        const error = new AppError('User not found', 404);
        return next(error);
    }
    res.sendStatus(204);
});

const Controller = {
    getAllUsers,
    createUser,
    loginUser,
    getUserById,
    updateUserById,
    deleteUserById,
};

export default Controller;
