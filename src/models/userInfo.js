const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Users2"
    },
    guide: {
        type: Boolean,
    },
    about: {
        type: String,
    },
    location: {
        type: String,
    },
    expertise: {
        type: [String],
    },
    quote: {
        type: String,
    },
    calendly: {
        type: String
    }
})

// Name of the model and the schema
module.exports = mongoose.model("UserInfo", userInfoSchema);