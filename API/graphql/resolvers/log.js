const { LOG, SEANCE, APPAREIL } = require('../../database/models');

module.exports = {
    Subscription:{
        newLogSub(_, args, {pubsub}) {
            subscribe: () => {
                const asyncIterator = pubsub.asyncIterator(['NEW_LOG']);
                return asyncIterator;
            }
        }
    },
    Mutation: {
        async newLog(_, {id_seance, id_appareil, date = Date.now(), type, description}, {pubsub}) {
            const Seance = await SEANCE.findByPk(id_seance);
            const Appareil = await APPAREIL.findByPk(id_appareil);
            const value = await LOG.create({
                id_seance : Seance.id,
                id_appareil: Appareil.id,
                date: date,
                type: type,
                description: description,
            });
            await pubsub.publish('NEW_LOG', {newLog: value});
            return value;
        },
    },

    Query: {
        async getLogs(root, args, context) {
            return LOG.findAll();
        },
        async getOneLog(_, { id }, context) {
            return LOG.findByPk(id);
        },

    },
    Log:{
        seance(log){
            return log.getSeance();
        },
        appareil(log){
            return log.getAppareil();
        },
        equipe(log){
            return log.getEquipe();
        }
    },
};
