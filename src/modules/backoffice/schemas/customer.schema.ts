import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    pets: [{
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'none'],
            required: true
        },
        kind: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        }
    }],
    billingAddress: {

    },
    shippingAddress: {
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});