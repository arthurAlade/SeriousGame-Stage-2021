const { DIALOGUE_PEPPER } = require('../../database/models');

module.exports = {
    Mutation: {
        async newDialogue_Pepper(root, {id, id_seance, dialogue, animation, phrase }) {
            return DIALOGUE_PEPPER.create({
                id: id,
                id_seance: id_seance,
                dialogue: dialogue,
                animation: animation,
                phrase: phrase});
        },
        async updateDialogue_Pepper(root, {id, id_seance, dialogue, animation, phrase }) {
             await DIALOGUE_PEPPER.update({
                id: id,
                id_seance: id_seance,
                dialogue: dialogue,
                animation: animation,
                phrase: phrase},
            {where: {id: id}});
             return await DIALOGUE_PEPPER.findByPk(id);
        },
        async deleteDialogue_Pepper(_,{id},__){
            await DIALOGUE_PEPPER.destroy({where: { id: id}});
            return true;
        },
    },

    Query: {
        async getAllDialogues_Peppers(_, {}) {
            DIALOGUE_PEPPER.findAll().then(function(value) {
                console.log(typeof value);
            });
            
            return DIALOGUE_PEPPER.findAll();
        },
        async getOneDialogue_Pepper(_, { id, id_seance }) {
            return DIALOGUE_PEPPER.findOne(
                {
                    where: {
                        id: id,
                        id_seance: id_seance
                    }
                }
            );
        }
    }
};
