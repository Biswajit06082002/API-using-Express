const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userid: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: Number
    },
    address: {
        required: true,
        type: String
    },
    pincode: {
        required: true,
        type: Number
    },
    blood_group: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('Data', dataSchema);