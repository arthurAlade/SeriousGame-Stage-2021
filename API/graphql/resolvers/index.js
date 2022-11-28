// graphql/resolvers/index.js
const storyboardResolvers = require('./storyboard');
const seanceResolvers = require('./seance');
const appareilResolvers = require('./appareil');
const dialogue_pepperResolvers = require('./dialogue_pepper');
const equipeResolvers = require('./equipe');
const joueurResolvers = require('./joueur');
const logResolvers = require('./log');
module.exports = [storyboardResolvers, seanceResolvers, appareilResolvers, dialogue_pepperResolvers, equipeResolvers, joueurResolvers, logResolvers];
