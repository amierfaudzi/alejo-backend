const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const Users2 = require('../models/users2');
const Questions = require('../models/questions');
const Answers = require('../models/answers');
const UserInfo = require('../models/userInfo');
const e = require('express');

// Returning all users in the database
async function users(){
    try {
        const users = await Users2.find();
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
        const user = await Users2.findById(args.id);
        console.log(user)
        return user
    } catch(err) {
        throw err
    }
}

// Returns all the guides in the database
async function guide(){
    try {
        const users = await Users2.find();
        let results = [];
        users.map(user => {
            if(user.guide === true){
                results.push(user)
            }
        })
        return results;
    } catch(err) {
        throw err;
    }
}

// Return all the questions
async function allQuestions(){
    try {
        const questions = await Questions.find();
        const answers = await Answers.find();

        let fullPosts = [];
        let fullPost;

        questions.map(question => {
            let allAnswers = [];
            let counter = 0;
            answers.map(answer=>{
                if(String(answer.questionId) == String(question._id)){
                    counter++;
                    allAnswers.push(answer)
                }
            })
            fullPost = {
                question: question,
                answers: allAnswers
            }
            fullPosts.push(fullPost)
        })
        return fullPosts;
    } catch(err) {
        throw err
    }
}

// Returning all question for a single user
async function userQuestions(parent, args, context){
    const { userId } = context;
    // Check to see if there is an authorized user with the request
    if(!userId){
        throw new Error("Unauthenticated!");
    }

    try {
        const questions = await Questions.find();
        let results = [];
        questions.map(question => {
            if(question.creator == userId){
                console.log(question)
                results.push(question)
            }
        })

        return results || [];
    } catch(err) {
        throw err
    }
}

// Return a specific question - maybe not needed
async function question(parent, args,){
    try {
        const question = await Questions.findById(args.id);
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

// Return all the answers a user had
async function userAnswers(parent, args, context){
    const { userId } = context;
    if(!userId){
        throw new Error("Unauthenticated!");
    }

    try {
        const answers = await Answers.find();
        let results = [];
        answers.map(answer => {
            if(answer.creator == userId){
                console.log(answer)
                results.push(answer)
            }
        })

        return results || [];
    } catch(err){
        throw err
    }
}

async function userInfo(parent, args){

    try{
        const result = await UserInfo.findOne({creator: args.creatorId});

        return result;

    } catch(err){
        throw err
    }
}

async function superUser(parent, args) {
    
    try{

        const basicInfo = await Users2.findById(args.id);
        const additionalInfo = await UserInfo.findOne({creator: args.id});

        let superUser;

        if(additionalInfo){
            superUser = {
                _id: basicInfo._id,
                email: basicInfo.email,
                firstName: basicInfo.firstName,
                lastName: basicInfo.lastName,
                expertise: additionalInfo.expertise,
                guide: additionalInfo.guide,
                about: additionalInfo.about,
                location: additionalInfo.location,
                calendly: additionalInfo.calendly,
                quote: additionalInfo.quote,
            };
        } else {
            superUser = {
                _id: basicInfo._id,
                email: basicInfo.email,
                firstName: basicInfo.firstName,
                lastName: basicInfo.lastName,
                expertise: [],
                guide: false,
                about: '',
                location: '',
                calendly: '',
                quote: '',
            };
        }

        return superUser
        
    } catch(err){
        throw err
    }
}

async function superUsers() {
    
    try{
        const basicInfo = await Users2.find();
        const extraInfo = await UserInfo.find();

        let processedUser = [];
        let superUser;

        basicInfo.map(basic=>{
            let counter = 0;
            extraInfo.map(extra=>{

                if(String(basic._id) == String(extra.creator)){
                    counter++;
                    superUser = {
                                _id: basic._id,
                                email: basic.email,
                                firstName: basic.firstName,
                                lastName: basic.lastName,
                                expertise: extra.expertise,
                                guide: extra.guide,
                                about: extra.about,
                                location: extra.location,
                                calendly: extra.calendly,
                                quote: extra.quote,
                                };
                            processedUser.push(superUser)
                }
            })
            if(counter < 1){
                superUser = {
                    _id: basic._id,
                    email: basic.email,
                    firstName: basic.firstName,
                    lastName: basic.lastName,
                    expertise: [],
                    guide: false,
                    about: '',
                    location: '',
                    calendly: '',
                    quote: '',
                };
                processedUser.push(superUser)
            }
        })

    return processedUser;

    }catch(err){
        throw err
    }
}

module.exports = {
    guide,
    users,
    user,
    allQuestions,
    question,
    answers,
    userQuestions,
    userAnswers,
    userInfo,
    superUser,
    superUsers
}