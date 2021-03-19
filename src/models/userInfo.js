const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Users2"
    },
    guide: {
        type: Boolean,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    expertise: {
        type: [String],
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    calendly: {
        type: String
    }
})

// Name of the model and the schema
module.exports = mongoose.model("UserInfo", userInfoSchema);