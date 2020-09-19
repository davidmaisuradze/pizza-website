import Joi from 'joi';

export default {
    createPizza: Joi.object({
        userEmail: Joi.string().email().allow(null, ''),
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        type: Joi.string().required()
    }),
    updatePizza: Joi.object({
        _id: Joi.string().required(),
        userEmail: Joi.string().email().allow(null, ''),
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        type: Joi.string().required()
    }),
    deletePizza: Joi.object({
        pizzaId: Joi.string().required()
    })
}
