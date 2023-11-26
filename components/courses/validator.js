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
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        instructor: Joi.string().required(),
        students: Joi.array().items(Joi.string())
    })
};

const createCourseValidator = { body: schema.body };
const updateCourseValidator = {
    params: IDValidator.params,
    body: schema.body
};
const deleteCourseValidator = IDValidator;
const getCourseValidator = IDValidator;

export {
    getCourseValidator,
    createCourseValidator,
    updateCourseValidator,
    deleteCourseValidator
};
