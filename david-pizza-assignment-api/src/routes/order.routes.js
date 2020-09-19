import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import { createValidator } from 'express-joi-validation';

import * as OrderController from '../controllers/order/order.controller';
import validators from '../controllers/order/order.validators';

const validator = createValidator();

const routes = new Router();

// GET
routes.get('/', authenticate, OrderController.getAllOrders);

// POST
routes.post('/', authenticate, validator.body(validators.createOrder), OrderController.createOrder);

export default routes;
