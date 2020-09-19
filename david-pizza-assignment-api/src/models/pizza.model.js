import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    userEmail: {type: String, ref: 'users'}
}, {timestamps: true});

export default mongoose.model('pizzas', pizzaSchema);
