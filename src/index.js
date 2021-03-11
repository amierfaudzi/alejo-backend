const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Users = require('./models/users');

require('dotenv').config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3ldhc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => console.log(err))

// Dummy users data
let users = [
    {
    "id": "123",
    "firstName": "Abu",
    "lastName": "Bakar",
    "email": "abu.bakar@mail.com",
    "location": "Toronto, Ontario",
    "guide": true,
    "expertise": [
        {"general": 5},
        {"location": 5},
        {"job": 4}
        ]
    },
    {
        "id": "123a",
        "firstName": "Adam",
        "lastName": "Murad",
        "email": "adam.murad@mail.com",
        "location": "Toronto, Ontario",
        "guide": true,
        "expertise": [
            {"general": 3},
            {"location": 5},
            {"job": 4}
            ]
        },
        {
            "id": "234a",
            "firstName": "Zack",
            "lastName": "Connor",
            "email": "z.connor@mail.com",
            "location": "Toronto, Ontario",
            "guide": false,
            "expertise": [
                {"general": 4},
                {"location": 4},
                {"job": 4}
                ]
            },
    {
        "id": "234",
        "firstName": "Ali",
        "lastName": "Bob",
        "email": "ali.bob@mail.com",
        "location": "Montreal, Quebec",
        "guide": false,
        "expertise": []
    }
]

// Question dummy data
let questions = [
    {
        content: "Where is the best boba place in Toronto?",
        userId: "234",
        id: "zyx"
    }
]

// Answer dummy data
let answers = [
    {
        content: "Chatime on Dundas is pretty good",
        userId: "123",
        questionId: "zyx",
        id: "mno"
    }
]

// Actual implementation of the schema
const resolvers = {
    Query: {
        // test endpoint
        info: () => "Hi",
        // Show all user
        users: () => users,
        // Finding a particular User/Viewing any user profile
        user: (parent, args) => {
            let user = users.filter(data => data.id === args.id)
            return user[0];
        },
        // Finding a guide
        guide: () => users.filter(user=>user.guide == true),
        allQuestion: () => questions,
        question: (parent,args) => questions.filter(question => question.id === args.id),
        answer: (parent, args) => answers.filter(answer => answer.questionId === args.questionId),
    },
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
            let newUser = new Users({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                expertise: args.userInput.expertise,
                about: args.userInput.about,
                guide: args.userInput.guide,
                location: args.userInput.location,
            });
            // users.push(newUser);
            // return to make it async
            return newUser.save()
            .then(result=> {
                console.log(result);
                return {...result._doc}
            })
            .catch(err => console.log(err))
        }
    },
}

const server = new ApolloServer({
    // Calling the Schema
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf-8'
    ),
    resolvers,
})

server
.listen()
.then(({ url }) => {
    console.log(`Server is running on ${url}`)
})
