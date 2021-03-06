const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

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
        "id": "234",
        "firstName": "Ali",
        "lastName": "Bob",
        "email": "ali.bob@mail.com",
        "location": "Montreal, Quebec",
        "guide": false,
        "expertise": []
    }
]

// Actual implementation of the schema
const resolvers = {
    Query: {
        info: () => "Hi",
        users: () => users,
        guide: () => users.filter(user=>user.guide == true)
    },
    // Resolvers for the User type
    User: {
        id: (parent) => parent.id,
        firstName: (parent) => parent.firstName,
        lastName: (parent) => parent.lastName,
        email: (parent) => parent.email,
        location: (parent) => parent.location,
        guide: (parent) => parent.guide,
        about: (parent) => parent.about
    }
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