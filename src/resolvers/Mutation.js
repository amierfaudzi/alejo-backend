const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');
const Questions = require('./models/questions');
const Answers = require('./models/Answers');

// Adding a question
function addQuestion(parent, args){
    let newQuestion = {};
    newQuestion.content = args.content;
    newQuestion.userId = args.userId;
    newQuestion.id = questions.length;
    questions.push(newQuestion);
    return newQuestion
}

// Adding an answer
function addAnswer(parent, args) {
    let newAnswer = new Answers({
        content: args.answerInput.content,
        questionId: args.answerInput.questionId,
        creator: args.answerInput.userId,
        date: args.answerInput.date // ISO date to string maybe
    });

    return newAnswer.save()
    .then(result=> {
        console.log(result);
        return {...result._doc};
    })
    .catch(err => console.log(err))
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
        const result = await Users.save();
        console.log(result)
        return result;
    } catch(err){
        throw err
    }
}

module.exports = {
    addUser,
    addQuestion,
    addAnswer
}