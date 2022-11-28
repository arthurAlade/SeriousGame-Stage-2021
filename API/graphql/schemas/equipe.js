const { gql } = require('apollo-server-express');
module.exports = gql`
    type Equipe{
        id: Int!
        seance: Seance!
        nom: String!
        role: String
        joueurs: [Joueur]
        tablette: Appareil
        log: [Log]
    }
    extend type Query {
        getAllEquipes:[Equipe]
        getAllEquipesBySeance(numSeance: Int!):[Equipe]
        getOneEquipe(id: Int!): Equipe
    }
    extend type Mutation {
        newEquipe(numSeance: Int!, nom: String!, role: String): Equipe
    }
`;
