const {SEANCE, EQUIPE, APPAREIL, LOG, JOUEUR} = require('../../database/models');

module.exports = {
    Mutation: {
        async newEquipe(root, { numSeance, nom, role }) {
            const seance = await SEANCE.findByPk(numSeance);
            let value = await EQUIPE.create({id_seance: seance.id, nom: nom, role: role});
            await LOG.create({
                date: Date.now(),
                type: "creation_Equipe",
                id_seance: seance.id,
                description: `Creation de l'équipe : ${value.nom} avec le rôle : ${value.role}`
            });
            return value;
        },
    },
    Query: {
        async getAllEquipes(_, {} ) {
            return EQUIPE.findAll();
        },
        async getOneEquipe(_, { id }) {
            return EQUIPE.findByPk(id);
        },
        async getAllEquipesBySeance(_,{ numSeance }){
            return await EQUIPE.findAll({where : {id_seance : numSeance}});
        }
    },
    Equipe: {
        seance(equipe) {
            return equipe.getSeance();
        },
        async tablette(equipe){
            return( await APPAREIL.findOne({ where : {id_equipe : equipe.id}}));
        },

        async joueurs(equipe){
            return( await JOUEUR.findAll({ where : {id_equipe : equipe.id}}));
        },
        async log(equipe){
            return(await LOG.findAll({ where:{id_equipe: equipe.id}}));
        }
    },
};
