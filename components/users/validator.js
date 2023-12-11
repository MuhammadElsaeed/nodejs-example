import Joi from 'joi';
import { ObjectId } from 'mongodb';

const IDValidator = {
    params: Joi.object({
        id: Joi.string().custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }).required()
    })
};

const schema = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
        role: Joi.string().valid('USER', 'ADMIN', 'MODERATOR').default('USER')
    })
};

const createUserValidator = { body: schema.body };
const updateUserValidator = {
    params: IDValidator.params,
    body: schema.body
};
const deleteUserValidator = IDValidator;
const getUserValidator = IDValidator;

const loginValidator = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
    })
};

export {
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    loginValidator
};
