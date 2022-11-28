const { APPAREIL } = require('../../database/models');
const { EQUIPE, LOG } = require('../../database/models');
module.exports = {
    Mutation: {
        async newAppareil(_, {nom, adresse_ip, adresse_mac, batterie, equipe, naomark}) {
            let objToCreate = {
                nom: nom,
                adresse_ip: adresse_ip,
                adresse_mac: adresse_mac,
                batterie: batterie,
                naomark: naomark
            }
            if(equipe !=null){
                const Equipe = await EQUIPE.findByPk(equipe);
                objToCreate["id_equipe"] = Equipe.id;
            }
            return APPAREIL.create(
                objToCreate
            );
        },
        async setEquipeAppareil(_,{id, equipe}, __){
            let Equipe = await EQUIPE.findByPk(equipe);
            await APPAREIL.update(
                { id_equipe: Equipe.id },
                { where: { id :id } }
            );
            return APPAREIL.findByPk(id);
        },
        async setNaomarkAppareil(_,{id, naomark}, __){
            await APPAREIL.update(
                { naomark: naomark },
                { where: { id :id } }
            );
            return APPAREIL.findByPk(id);
        },
        async setIPAppareil(_,{id, adresse_ip}, __){
            await APPAREIL.update(
                { adresse_ip: adresse_ip },
                { where: { id :id } }
            );
            return APPAREIL.findByPk(id);
        },
        async setMACAppareil(_,{id, adresse_mac}, __){
            await APPAREIL.update(
                { adresse_mac: adresse_mac },
                { where: { id :id } }
            );
            return APPAREIL.findByPk(id);
        },

},

    Query: {
        async getAllAppareils(_, {}) {
            return APPAREIL.findAll();
        },
        async getOneAppareil(_, { id }) {
            return APPAREIL.findByPk(id);
        },
    },
    Appareil: {
        equipe(appareil) {
            return appareil.getEquipe();
        },
        log(appareil){
            return LOG.findAll({where:{id_appareil: appareil.id}})
        }
    },
};
