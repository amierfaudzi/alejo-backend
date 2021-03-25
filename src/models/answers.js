const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.Mixed,
        ref: 'Users2'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    }
})

// Name of the model and the schema
module.exports = mongoose.model("Answers", answerSchema);