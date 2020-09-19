import PizzaModel from '../models/pizza.model';
import UserModel from '../models/user.model';
import HttpStatus from 'http-status';

export const getAllPizzas = async () => {
    try {
        const pizzas = await PizzaModel.find({}).sort('-createdAt');

        return {status: HttpStatus.OK, data: pizzas};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const createPizza = async (currentUserEmail, data) => {
    try {
        const {title, description, type, price, userEmail} = data;

        const email = userEmail || currentUserEmail;

        const user = await UserModel.findOne({email: email});
        if (!user) {
            return {status: HttpStatus.BAD_REQUEST, data: 'user not found'};
        }

        const newPizza = new PizzaModel({
            title,
            description,
            type,
            price,
            userEmail: email
        });
        const result = await newPizza.save();

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        console.log(err, 'err');
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const updatePizza = async (currentUserEmail, data) => {
    try {
        const {_id, title, description, type, price, userEmail} = data;

        const email = userEmail || currentUserEmail;

        const user = await UserModel.findOne({email: email});
        if (!user) {
            return {status: HttpStatus.BAD_REQUEST, data: 'user not found'};
        }

        const result = await PizzaModel.findOneAndUpdate(
            {_id: _id},
            {
                $set: {
                    title,
                    description,
                    type,
                    price,
                    userEmail: email
                }
            },
            {upsert: true, new: true}
        );

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const deletePizza = async pizzaId => {
    try {
        const result = await PizzaModel.findOneAndDelete({_id: pizzaId});

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
