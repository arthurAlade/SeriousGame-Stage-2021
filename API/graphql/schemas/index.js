// graphql/schemas/index.js

const { gql } = require('apollo-server-express');
const appareilType = require('./appareil');
const dialogue_pepperType = require('./dialogue_pepper');
const equipeType = require('./equipe');
const joueurType = require('./joueur');
const logType = require('./log');
const seanceType = require('./seance');
const storyboardType = require('./stoyboard');

const rootType = gql`
    type Query {
        root: String
    }
    type Mutation {
        root: String
    }
    type Subscription{
        root:String
    }

`;

module.exports = [rootType, storyboardType, seanceType, dialogue_pepperType, equipeType, appareilType, joueurType, logType];