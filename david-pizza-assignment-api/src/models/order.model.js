import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    address: {type: String, required: true},
    mobile: {type: String, required: true},
    orderedPizzas: {type: String, required: false},
    totalPrice: {type: Number, required: true},
    userEmail: {type: String, ref: 'users'}
}, {timestamps: true});

export default mongoose.model('orders', orderSchema);
