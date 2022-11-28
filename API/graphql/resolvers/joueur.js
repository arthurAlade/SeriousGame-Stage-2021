const { JOUEUR, EQUIPE, LOG} = require("../../database/models");

module.exports = {
    Mutation: {
        async newJoueur(root, { nom, prenom, role, id_equipe }, context) {
            let equipe = await EQUIPE.findByPk(id_equipe);
            let value = await JOUEUR.create({
                nom: nom,
                prenom: prenom,
                role: role,
                id_equipe: equipe.id
            });
            await LOG.create({
                date: Date.now(),
                type: "creation_Joueur",
                id_seance: equipe.id_seance,
                id_equipe: equipe.id,
                description: `Creation du joueur : ${nom} ${prenom}, equipe : ${equipe.nom}`,
            });
            return value;
        },
        async setEquipeJoueur(_,{id, equipe}, __){
            let Equipe = await EQUIPE.findByPk(equipe);
            await JOUEUR.update(
                { id_equipe: Equipe.id },
                { where: { id :id } }
            );
            return JOUEUR.findByPk(id);
        },
        async deleteJoueur(_,{id},__){
            await JOUEUR.destroy({where: { id: id}});
            return true;
        },
    },
    Query: {
        async getAllJoueurs(root, {}, context) {
            return JOUEUR.findAll();
        },
        async getAllJoueursByEquipe(root, {equipe}, context) {
            return JOUEUR.findAll({where: {id_equipe: equipe}});
        },
        async getOneJoueur(root, { id }, context) {
            return JOUEUR.findByPk(id);
        }
    },
    Joueur: {
        equipe(joueur){
            return joueur.getEquipe();
        }
    }
};