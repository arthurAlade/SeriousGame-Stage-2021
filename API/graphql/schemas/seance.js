const { gql } = require('apollo-server-express');
module.exports = gql`
    scalar DateTime
    type Seance{
        id: Int!
        date: DateTime
        lieu: String!
        naomark: Int!
        storyboard: Storyboard
        etat: String!
        classeEcole:String
        equipe:[Equipe]
        log:[Log]
        dialogue_pepper:[Dialogue_Pepper]
    }
    extend type Query {
        getAllSeances:[Seance!]
        getAllSeancesOrderByEtat:[Seance!]
        getOneSeance(id: Int!):Seance
    }
    extend type Mutation {
        newSeance(date: DateTime, lieu: String!, naomark: Int!, NumStoryboard: Int, classeEcole: String):Seance
        setEtatSeance(id: Int!, etat: String!):Seance
    }
`;