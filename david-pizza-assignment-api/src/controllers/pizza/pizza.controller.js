import * as pizzaService from '../../services/pizza.service';

export const getAllPizzas = async (req, res, next) => {
    const {status, data} = await pizzaService.getAllPizzas();
    return res.status(status).json(data);
};

export const createPizza = async (req, res, next) => {
    const {currentUser, body} = req;

    const {status, data} = await pizzaService.createPizza(currentUser.email, body);
    return res.status(status).json(data);
};

export const updatePizza = async (req, res, next) => {
    const {currentUser, body} = req;

    const {status, data} = await pizzaService.updatePizza(currentUser.email, body);
    return res.status(status).json(data);
};

export const deletePizza = async (req, res, next) => {
    const {status, data} = await pizzaService.deletePizza(req.params.pizzaId);
    return res.status(status).json(data);
};
