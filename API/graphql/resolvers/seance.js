const { SEANCE, LOG, EQUIPE } = require('../../database/models');
const { STORYBOARD } = require('../../database/models');
const { GraphQLScalarType } = require('graphql');
module.exports = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }),
    Mutation: {
        async newSeance(_, {date=Date.now(), lieu, naomark, NumStoryboard, classeEcole=null},) {
            try {
                let Storyboard = await STORYBOARD.findByPk(NumStoryboard);
                console.log(NumStoryboard);
                console.log("Storyboard: "+Storyboard);
                let value;
                if (classeEcole != null){
                    console.log("Storyboard:"+Storyboard.id);
                     value = await SEANCE.create({
                        date: date,
                        lieu: lieu,
                        naomark: naomark,
                        etat: "enAttente",
                        id_storyboard: Storyboard.id,
                        classeEcole: classeEcole,
                    });
                }
                else {
                    console.log("Storyboard:"+Storyboard.id);
                    value = await SEANCE.create({
                        date: date,
                        lieu: lieu,
                        naomark: naomark,
                        etat: "creer",
                        id_storyboard: Storyboard.id,
                    });
                    //console.log("creer");
                }
                console.log(value);
                await LOG.create({
                    date: Date.now(),
                    type: "creation_Seance",
                    id_seance: value.id,
                    description: `Creation de la Seance n°${value.id}`,
                });
                return value;
            }
        catch{
                console.error("Storyboard inconnu ou erreur");
            }
        },
        async setEtatSeance(_, {id, etat}){
            await SEANCE.update(
                { etat: etat },
                { where: { id :id } }
            );
            await LOG.create({
                date: Date.now(),
                type: "modificationEtat_Seance",
                id_seance: id,
                description: `La Seance n°${id} est : ${etat}`,
            });
            return SEANCE.findByPk(id);
        },
    },

    Query: {
        async getAllSeances(root, args, context) {
            return SEANCE.findAll();
        },
        async getAllSeancesOrderByEtat(_, __, ___){
            return SEANCE.findAll({order:[['etat', 'ASC']]});
        },
        async getOneSeance(_, { id }, context) {
            return SEANCE.findByPk(id);
        },
    },
    Seance: {
        storyboard(seance) {
            return seance.getStoryboard();
        },
        async equipe(seance){
            return await EQUIPE.findAll({where : {id_seance : seance.id}});
        },
        async log(seance) {
            return await LOG.findAll({where : {id_seance : seance.id}});
        }
    },
};
