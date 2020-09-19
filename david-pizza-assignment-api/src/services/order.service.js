import OrderModel from '../models/order.model';
import HttpStatus from 'http-status';
import UserModel from '../models/user.model';

export const getAllOrders = async (currentUserEmail) => {
    try {
        const user = await UserModel.findOne({email: currentUserEmail});
        if (!user) {
            return {status: HttpStatus.BAD_REQUEST, data: 'user not found'};
        }

        const orders = await OrderModel.find({userEmail: currentUserEmail}).sort('-createdAt');
        return {status: HttpStatus.OK, data: orders};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const createOrder = async (currentUserEmail, data) => {
    try {
        const {name, surname, mobile, address, totalPrice, orderedPizzas} = data;

        const user = await UserModel.findOne({email: currentUserEmail});
        if (!user) {
            return {status: HttpStatus.BAD_REQUEST, data: 'user not found'};
        }

        const newOrder = new OrderModel({
            name,
            surname,
            mobile,
            address,
            totalPrice,
            orderedPizzas,
            userEmail: currentUserEmail
        });
        const result = await newOrder.save();

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        console.log(err, 'err');
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
