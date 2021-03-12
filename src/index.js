const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

require('dotenv').config();

// Actual implementation of the schema
const resolvers = {
    Query,
    // Resolvers for the mutation type
    Mutation,
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