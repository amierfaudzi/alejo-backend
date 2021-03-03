const { ApolloServer } = require('apollo-server');

// GraphQL schema here
const typeDefs = `
    type Query {
        info: String!
    }
`
// Actual implementation of the schema
const resolvers = {
    Query: {
        info: () => "Hi"
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen()
    .then(({ url }) => {
        console.log(`Server is running on ${url}`)
    })