import Joi from 'joi';

const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    instructor: Joi.string().required(),
    students: Joi.array().items(Joi.string())
});
export default schema;