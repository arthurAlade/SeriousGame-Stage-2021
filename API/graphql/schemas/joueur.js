const { gql } = require('apollo-server-express');
module.exports = gql`
    type Joueur{
        id: Int!
        nom: String!
        prenom: String!
        equipe: Equipe!
        role: String!
    }
    extend type Query {
        getAllJoueurs:[Joueur]
        getAllJoueursByEquipe(equipe: Int!):[Joueur]
        getOneJoueur(id: Int!): Joueur
    }
    extend type Mutation {
        newJoueur(nom: String!, prenom: String!, role: String, id_equipe: Int!):Joueur
        setEquipeJoueur(id: Int!, equipe: Int!):Joueur
        deleteJoueur(id: Int!):Boolean
    }
`;