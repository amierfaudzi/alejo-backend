const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');
const Questions = require('./models/questions');
const Answers = require('./models/Answers');

// Adding a question
async function addQuestion(parent, args, context){
    const { userId } = context;
    // Check to see if there is an authorized user with the request
    if(userId){
        throw new Error("Unauthenticated!");
    }

    try {
        const newQuestion = new Questions({
            content: args.questionInput.content,
            creator: userId,
        });

        const result = await newQuestion.save();
        return result;
    } catch(err){
        throw err
    }
}

// Adding an answer
async function addAnswer(parent, args, context) {
    const { userId } = context;
    // Check to see if there is an authorized user with the request
    if(userId){
        throw new Error("Unauthenticated!");
    }

    try {
        const newAnswer = new Answers({
            content: args.answerInput.content,
            creator: userId,
            questionId: args.answerInput.questionId
        })
        const result = await newAnswer.save();
        return result;
    } catch(err) {
        throw err
    }
}

// Adding a user
async function addUser(parent, args){

    try {
        const existingUser = await User.findOne({ email: args.userInput.email});
        if(existingUser){
            throw new Error("User exist already.");
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        
        // Create user object based on the database model
        const newUser = new Users({
            firstName: args.userInput.firstName,
            lastName: args.userInput.lastName,
            email: args.userInput.email,
            expertise: args.userInput.expertise,
            about: args.userInput.about,
            guide: args.userInput.guide,
            location: args.userInput.location,
            password: hashedPassword
        });

        // Save the item on the database
        const result = await newUser.save();
        console.log(result)
        return {...result, password: null};
    } catch(err){
        throw err
    }
}

module.exports = {
    addUser,
    addQuestion,
    addAnswer
}