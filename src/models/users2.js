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
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
});

// Name of the model and the schema
module.exports = mongoose.model("Users2", newUserSchema);