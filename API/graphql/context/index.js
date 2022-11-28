// graphql/context/index.js
const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();
module.exports = ({ req }) => {
    return {req, pubsub};
};