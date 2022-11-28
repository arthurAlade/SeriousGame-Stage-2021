const { gql } = require('apollo-server-express');
module.exports = gql`
    type Dialogue_Pepper {
        id: String!
        id_seance: Int!
        dialogue: String!
        phrase: String
        animation: String
    }
    extend type Query {
        getAllDialogues_Peppers: [Dialogue_Pepper!]
        getOneDialogue_Pepper(id: String!, id_seance: Int!): Dialogue_Pepper
    }
    extend type Mutation {
        newDialogue_Pepper(id: String!, id_seance: Int!, dialogue: String!, phrase: String, animation: String): Dialogue_Pepper
        updateDialogue_Pepper(id: String!, id_seance: Int, dialogue: String, phrase: String, animation: String):Dialogue_Pepper
        deleteDialogue_Pepper(id: String!): Boolean
    }
`;