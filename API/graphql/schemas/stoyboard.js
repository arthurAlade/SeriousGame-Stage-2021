const { gql } = require('apollo-server-express');
module.exports = gql`
    type Storyboard{
        id: Int!
        texte: String
        seance:[Seance]
    }
    extend type Query {
        getAllStoryboards:[Storyboard]
        getOneStoryboard(id: Int!):Storyboard
    }
    extend type Mutation {
        newStoryboard(texte: String!):Storyboard
    }
`;