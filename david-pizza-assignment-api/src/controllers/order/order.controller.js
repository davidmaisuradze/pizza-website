import * as orderService from '../../services/order.service';

export const getAllOrders = async (req, res, next) => {
    const {currentUser} = req;

    const {status, data} = await orderService.getAllOrders(currentUser.email);
    return res.status(status).json(data);
};

export const createOrder = async (req, res, next) => {
    const {currentUser, body} = req;

    const {status, data} = await orderService.createOrder(currentUser.email, body);
    return res.status(status).json(data);
};
