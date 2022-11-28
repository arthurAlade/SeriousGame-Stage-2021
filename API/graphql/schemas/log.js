const { gql } = require('apollo-server-express');
module.exports = gql`    
    type Log{
        id: Int!
        seance: Seance
        appareil: Appareil
        equipe: Equipe
        date: DateTime
        type: String
        description: String
    }
    extend type Query {
        getLogs:[Log]
        getOneLog(id: ID!): Log
    }
    extend type Mutation {
        newLog(id_seance: Int!, id_appareil: Int, id_equipe: Int,date: DateTime, type: String, description: String): Log
    }
    extend type Subscription {
        newLogSub: Log
    }
`;