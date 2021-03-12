const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Users = require('./models/users');
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query');

require('dotenv').config();

// Actual implementation of the schema
const resolvers = {
    // Query: {
    //     // test endpoint
    //     info: () => "Hi",
    //     // Show all user
    //     users: () => users,
    //     // Finding a particular User/Viewing any user profile
    //     user: (parent, args) => {
    //         let user = users.filter(data => data.id === args.id)
    //         return user[0];
    //     },
    //     // Finding a guide
    //     guide: () => users.filter(user=>user.guide == true),
    //     allQuestion: () => questions,
    //     question: (parent,args) => questions.filter(question => question.id === args.id),
    //     answer: (parent, args) => answers.filter(answer => answer.questionId === args.questionId),
    // },
    Query,
    // Resolvers for the mutation type
    Mutation: {
        addQuestion: (parent, args) => {
            let newQuestion = {};
            newQuestion.content = args.content;
            newQuestion.userId = args.userId;
            newQuestion.id = questions.length;
            questions.push(newQuestion);
            return newQuestion
        },
        addAnswer: (parent, args) => {
            let newAnswer = {};
            newAnswer.content = args.content;
            newAnswer.questionId = args.questionId;
            newAnswer.userId = args.userId;
            answers.push(newAnswer);
            return newAnswer;
        },
        addUser: (parent, args) => {
            // Create user object based on the database model
            let newUser = new Users({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                expertise: args.userInput.expertise,
                about: args.userInput.about,
                guide: args.userInput.guide,
                location: args.userInput.location,
            });
            // Save the item
            return newUser.save()
            .then(result=> {
                console.log(result);
                return {...result._doc};
            })
            .catch(err => console.log(err))
        }
    },
}

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3ldhc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
    .then(() => {
        const server = new ApolloServer({
            // Calling the Schema
            typeDefs: fs.readFileSync(
                path.join(__dirname, 'schema.graphql'),
                'utf-8'
            ),
            resolvers,
            context: ({ req }) => {
                return {
                    ...req,
                    userId:
                    req && req.headers.authorization ? 
                    getUserId(req) : null
                }
            }
        })
        
        server
        .listen()
        .then(({ url }) => {
            console.log(`Server is running on ${url}`)
        })
        console.log("Connected to MongoDB")
    })
    .catch(err => console.log(err))

// put the auth into context so that I dont have to do the middleware shenanigans