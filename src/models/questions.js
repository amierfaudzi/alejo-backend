const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

// Name of the model and the schema
module.exports = mongoose.model("Questions", questionSchema);