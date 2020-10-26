const { gql } = require('apollo-server');

const typeDefs = gql`

    type Query {
        users: [User]!
    }

    type User {
        id: ID
        name: String
        url: String
        description: String
        link: String
        slug: String
        avatar: String
        posts: Int
    }

`;

module.exports = typeDefs;