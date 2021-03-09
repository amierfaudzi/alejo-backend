const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        required: true
    },
    email : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    guide : {
        type: Boolean,
        required: true
    },
    expertise : {
        type: [String],
        required: false
    },
});

// Name of the model and the schema
module.exports = mongoose.model("Users", userSchema);