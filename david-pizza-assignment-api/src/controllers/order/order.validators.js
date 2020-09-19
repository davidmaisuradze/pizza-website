import Joi from 'joi';

export default {
    createOrder: Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        mobile: Joi.string().required(),
        address: Joi.string().required(),
        totalPrice: Joi.number().required(),
        orderedPizzas: Joi.string()
    })
}
