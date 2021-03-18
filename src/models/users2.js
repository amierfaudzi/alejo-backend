const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newUserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: false
    },
    email : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: false
    },
    guide : {
        type: Boolean,
        required: false
    },
    expertise : {
        type: [String],
        required: false
    },
    password: {
        type: String,
        required: true
    },
    calendly: {
        type: String,
        required: false
    },
    quote: {
        type: String,
        required: false
    }
});

// Name of the model and the schema
module.exports = mongoose.model("Users2", newUserSchema);