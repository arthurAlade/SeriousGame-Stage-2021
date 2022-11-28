const { gql } = require('apollo-server-express');
module.exports = gql`
    type Appareil {
        id: Int!
        equipe: Equipe
        nom: String!
        adresse_ip: String!
        adresse_mac: String!
        batterie: Int
        naomark: Int
        log:[Log]
    }
    extend type Query {
        getAllAppareils: [Appareil]
        getOneAppareil(id: Int!): Appareil
    }
    extend type Mutation {
        newAppareil(nom: String!, adresse_ip: String!, adresse_mac: String!, batterie: Int, equipe: Int, naomark:Int): Appareil
        setEquipeAppareil(id: Int!, equipe: Int!):Appareil
        setNaomarkAppareil(id: Int!, naomark: Int!): Appareil
        setIPAppareil(id: Int!, adresse_ip: String!): Appareil
        setMACAppareil(id: Int!, adresse_mac: String!): Appareil
    }
`;