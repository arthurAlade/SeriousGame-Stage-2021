const { STORYBOARD, LOG } = require('../../database/models');
const { sequelize } = require('sequelize');
module.exports = {
    Mutation: {
         async newStoryboard(root, { texte }) {
             let value = await STORYBOARD.create({texte: texte});
             await LOG.create({
                 date: Date.now(),
                 type: "creation_Storyboard",
                 description: `Creation du storyboard n°${value.id}`,
             })
             return value;
         },
    },
    Query: {
        async getAllStoryboards(root, args) {
            return STORYBOARD.findAll();
        },
        async getOneStoryboard(_, { id }) {
            return STORYBOARD.findByPk(id);
        },
    },
};
