import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import { createValidator } from 'express-joi-validation';

import * as PizzaController from '../controllers/pizza/pizza.controller';
import validators from '../controllers/pizza/pizza.validators';

const validator = createValidator();

const routes = new Router();

// GET
routes.get('/', authenticate, PizzaController.getAllPizzas);

// POST
routes.post('/', authenticate, validator.body(validators.createPizza), PizzaController.createPizza);

// PUT
routes.put('/', authenticate, validator.body(validators.updatePizza), PizzaController.updatePizza);

// DELETE
routes.delete('/:pizzaId', authenticate, validator.params(validators.deletePizza), PizzaController.deletePizza);

export default routes;
