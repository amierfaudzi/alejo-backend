const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const Users = require('../models/users');
const Users2 = require('../models/users2');
const Question = require('../models/questions');
const Answer = require('../models/answers');

// Adding a question
async function addQuestion(parent, args, context){
    const { userId } = context;
    // Check to see if there is an authorized user with the request
    if(!userId){
        throw new Error("Unauthenticated!");
    }

    try {
        const newQuestion = new Question({
            content: args.questionInput.content,
            creator: userId,
            date: new Date()
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
    if(!userId){
        throw new Error("Unauthenticated!");
    }

    try {
        const newAnswer = new Answer({
            content: args.answerInput.content,
            creator: userId,
            questionId: args.answerInput.questionId,
            date: new Date()
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
        const existingUser = await Users.findOne({ email: args.userInput.email});
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
            password: hashedPassword,
            quote: '',
            calendly: ''
        });
        // Creating a JWToken
        const token = jwt.sign({userId: newUser.id}, APP_SECRET);
        // Save the item on the database
        let result = await newUser.save();
        // Clearing the password for security
        result.password = null;
        console.log(result)
        return {
            // Bug here with result showing as null on gql playground
            result,
            token
        };
    } catch(err){
        throw err
    }
}

async function signup(parent, args){
    try {
        const existingUser = await Users2.findOne({ email: args.signupInput.email});
        if(existingUser){
            throw new Error("User exist already.");
        }
        const hashedPassword = await bcrypt.hash(args.signupInput.password, 12);
        
        // Create user object based on the database model
        const newUser = new Users2({
            firstName: args.signupInput.firstName,
            lastName: args.signupInput.lastName,
            email: args.signupInput.email,
            password: hashedPassword,
        });
        console.log(newUser)
        // Creating a JWToken
        const token = jwt.sign({userId: newUser.id}, APP_SECRET);
        // Save the item on the database
        let result = await newUser.save();
        // Clearing the password for security
        result.password = null;
        console.log(result)
        return {
            // Bug here with result showing as null on gql playground
            result,
            token
        };
    } catch(err){
        throw err
    }
}

module.exports = {
    addUser,
    addQuestion,
    addAnswer,
    signup
}