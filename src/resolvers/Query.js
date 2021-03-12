const Users = require('../models/users');
const Questions = require('./models/questions');
const Answers = require('./models/Answers');

// Returning all users in the database
async function users(){
    try {
        const users = await Users.find();
        return users.map(user => {
            console.log(user)
            return user
        })
    } catch(err) {
        throw err;
    }
}

// Returning a specific user by using their id
async function user(parent, args,){
    try {
        const user = await Users.findById(args.id);
        console.log(user)
        return user
    } catch(err) {
        throw err
    }
}

// Returns all the guides in the database
async function guide(){
    try {
        const users = await Users.find();
        return users.map(user => {
            console.log(user);
            if(user.guide === true){
                return user
            } else {
                return ''
            }
        })
    } catch(err) {
        throw err;
    }
}

// Return all the questions
async function allQuestions(){
    try {
        const questions = await Questions.find();
        return questions.map(question => {
            console.log(question);
            return question
        })
    } catch(err) {
        throw err
    }
}

// Return a specific question - maybe not needed
async function question(parent, args,){
    try {
        const question = await Questions.findById(args.id);
        console.log(question)
        return question
    } catch(err) {
        throw err
    }
}

// Return all the answers to a question
async function answers(parent, args){
    try {
        // need to receive the question id
        const answers = await Answers.findById(args.id);
        console.log(answers)
        return answers
    } catch(err) {
        throw err
    }
}

module.exports = {
    guide,
    users,
    user,
    allQuestions,
    question,
    answers
}