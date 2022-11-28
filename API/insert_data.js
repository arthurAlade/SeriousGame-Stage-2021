const fetch = require("node-fetch");

const url = "http://localhost:3301/api";

function request(req){

    var op = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(req)
    };

    const reponse = fetch(url, op);

    return reponse;
    
}

function insertStoryBoard() {
    let st =  `"{
        \\"storyBoard\\": {
            \\"name\\": \\"applicationPepper\\",
            \\"activites\\": [
                {
                    \\"name\\": \\"accueil\\",
                    \\"id\\": \\"Act1\\",
                    \\"transitionType\\": \\"button\\",
                    \\"target\\": \\"nextBlue\\",
                    \\"targetContent\\": \\"C'est parti ?\\",
                    \\"scenes\\": [
                        {
                            \\"id\\": \\"Act1_Scene1\\",
                            \\"modele\\": \\"Dialoguer\\",
                            \\"transitionType\\": \\"button\\",
                            \\"target\\": \\"nextBlue\\",
                            \\"targetContent\\": \\"Vous êtes prêts ?\\",
                            \\"display\\": [
                                {
                                    \\"style\\": {
                                        \\"bottom\\": \\"-1vw\\",
                                        \\"height\\": \\"35vw\\",
                                        \\"left\\": \\"-5vw\\"
                                    },
                                    \\"source\\": \\"pepper.png\\"
                                }
                            ],
                            \\"args\\": {
                                \\"dialogues\\": [
                                    \\"act1_sce1_dialogue1\\",
                                    \\"act1_sce1_dialogue2\\"
                                ]
                            }
                        },
                        {
                            \\"id\\": \\"Act1_Scene2\\",
                            \\"modele\\": \\"Dialoguer\\",
                            \\"transitionType\\": \\"button\\",
                            \\"target\\": \\"nextBlue\\",
                            \\"targetContent\\": \\"C'est parti !\\",
                            \\"display\\": [
                                {
                                    \\"style\\": {
                                        \\"bottom\\": \\"-1vw\\",
                                        \\"height\\": \\"35vw\\",
                                        \\"left\\": \\"-5vw\\"
                                    },
                                    \\"source\\": \\"pepper.png\\"
                                },
                                {
                                    \\"style\\": {
                                        \\"bottom\\": \\"-1vw\\",
                                        \\"left\\": \\"75vw\\",
                                        \\"height\\": \\"35vw\\",
                                        \\"transform\\": \\"scaleX(-1)\\"
                                    },
                                    \\"source\\": \\"rose.png\\"
                                }
                            ],
                            \\"args\\": {
                                \\"dialogues\\": [
                                    \\"act1_sce2_dialogue1\\",
                                    \\"act1_sce2_dialogue2\\",
                                    \\"act1_sce2_dialogue3\\"
                                ]
                            }
                        }
                    ]
                },
                {
                    \\"name\\": \\"distributionTablettesJeu\\",
                    \\"id\\": \\"Act2\\",
                    \\"transitionType\\": \\"timeout\\",
                    \\"duration\\": 60000,
                    \\"scenes\\": [
                        {
                            \\"id\\": \\"Act2_Scene1\\",
                            \\"modele\\": \\"Dialoguer\\",
                            \\"transitionType\\": \\"timeout\\",
                            \\"duration\\": 4000,
                            \\"args\\": {
                                \\"dialogues\\": [
                                    \\"act2_sce1_dialogue1\\",
                                    \\"act2_sce1_dialogue2\\"
                                ]
                            }
                        },
                        {
                            \\"id\\": \\"Act2_Scene2\\",
                            \\"modele\\": \\"DistributionTablettes\\",
                            \\"transitionType\\": \\"timeout\\",
                            \\"duration\\": 2000,
                            \\"args\\": {
                                \\"start\\": {
                                    \\"modele\\": \\"subDialog\\",
                                    \\"dialogue\\": \\"act2_sce2_start\\",
                                    \\"duration\\": 10000
                                },
                                \\"ok\\": {
                                    \\"modele\\": \\"subDialog\\",
                                    \\"dialogue\\": \\"act2_sce2_ok\\",
                                    \\"duration\\": 2000
                                },
                                \\"ko\\": {
                                    \\"modele\\": \\"subDialog\\",
                                    \\"dialogue\\": \\"act2_sce2_ko\\",
                                    \\"duration\\": 2000
                                },
                                \\"textDemandeScan\\": \\"act2_sce2_dialogue1\\",
                                \\"variableDemandeScan\\": \\"tablette\\",
                                \\"positionVariableDemandeScan\\": 46
                                
                            }
                        },
                        {
                            \\"id\\": \\"Act2_Scene3\\",
                            \\"modele\\": \\"Dialoguer\\",
                            \\"transitionType\\": \\"timeout\\",
                            \\"duration\\": 2000,
                            \\"args\\": {
                                \\"dialogues\\": [
                                    \\"act2_sce3_dialogue1\\"
                                ]
                            }
                        }
                    ]
                },
                {
                    \\"name\\": \\"checkpoint\\",
                    \\"id\\": \\"Act2_Checkpoint\\",
                    \\"scenes\\": [
                        {
                            \\"id\\": \\"checkpoint2\\",
                            \\"modele\\": \\"Attente\\"
                        }
                    ]
                },
                {
                    \\"name\\": \\"retourTablettesJeu\\",
                    \\"id\\": \\"Act3\\",
                    \\"transitionType\\": \\"button\\",
                    \\"target\\": \\"nextBlue\\",
                    \\"targetContent\\": \\"Lancer la conférence\\",
                    \\"scenes\\": [
                        {
                            \\"id\\": \\"Act3_Scene1\\",
                            \\"modele\\": \\"Dialoguer\\",
                            \\"transitionType\\": \\"timeout\\",
                            \\"duration\\": 4000,
                            \\"args\\": {
                                \\"dialogues\\": [
                                    \\"act3_sce1_dialogue1\\",
                                    \\"act3_sce1_dialogue2\\"
                                ]
                            }
                        },
                        {
                            \\"id\\": \\"Act3_Scene1\\",
                            \\"modele\\": \\"RetourTablettes\\",
                            \\"args\\": {
                                \\"ok\\": {
                                    \\"modele\\": \\"subDialog\\",
                                    \\"dialogue\\": \\"act3_sce2_ok\\",
                                    \\"duration\\": 2000
                                },
                                \\"ko\\": {
                                    \\"modele\\": \\"subDialog\\",
                                    \\"dialogue\\": \\"act3_sce2_ko\\",
                                    \\"duration\\": 2000
                                }
                            }
                        }
                    ]
                },
                {
                    \\"name\\": \\"conclusion\\",
                    \\"id\\": \\"Act4\\",
                    \\"transitionType\\": \\"timeout\\",
                    \\"duration\\": 2000,
                    \\"scenes\\": [
                        {
                            \\"id\\": \\"Act4_Scene1\\",
                            \\"modele\\": \\"Dialoguer\\",
                            \\"transitionType\\": \\"timeout\\",
                            \\"duration\\": 2000,
                            \\"args\\": {
                                \\"dialogues\\": [
                                    \\"act4_sce1_dialogue1\\"
                                ]
                            }
                        }
                    ]
                },
                {
                    \\"name\\": \\"checkpoint\\",
                    \\"id\\": \\"END\\",
                    \\"scenes\\": [
                        {
                            \\"id\\": \\"checkpoint3\\",
                            \\"modele\\": \\"Attente\\"
                        }
                    ]
                }
            ]
        }
    }"`
    st = st.replace(/(\r\n|\n|\r)/gm, "");
    return new Promise(function(resolve, reject) {
        let newStoryBoard ={
            query: `
                mutation {
                    newStoryboard(texte: `+st+`){id}
                }
            `
        };
        //console.log(JSON.stringify(newStoryBoard));
        let reponse = request(newStoryBoard);
        reponse.then(function(value) {
            console.log(value.json().then(function(values) {
                console.log(values);
                resolve();
            }));
        });
    });
};

function insertSeance() {
    return new Promise(function(resolve, reject) {
        let newSeance = {
            query: `
                mutation {
                    newSeance(date: "2021-06-20",
                        lieu: "Angoulême",
                        naomark: 112,
                        NumStoryboard: 1){id}
                }
            `
        };
        let reponse = request(newSeance);
        reponse.then(function(value) {
            console.log(value.json().then(function(values) {
                console.log(values);
                resolve();
            }));
        });
    });
}

let equipes = [
    `
    mutation {
        newEquipe(numSeance: 1,
            nom: "Les Goonies",
            role: "Historien")
        {id}
    }
    `,
    `
    mutation {
        newEquipe(numSeance: 1,
            nom: "Les Indianas",
            role: "Géologue")
        {id}
    }
    `
]

function insertEquipe(equipe) {
    return new Promise(function(resolve, reject) {
        let newEquipes = {
            query: equipe
        };
        let reponse = request(newEquipes);
        reponse.then(function(value) {
            console.log(value.json().then(function(values) {
                console.log(values);
                resolve();
            }));
        });
    });
};

let appareils = [
    `
    mutation {
        newAppareil(nom: "Historien"
            adresse_ip: "192.168.56.5",
            adresse_mac: "00:1B:44:11:3A:B7",
            batterie: 75
            equipe: 1,
            naomark: 119,
        ){id}
    }
    `,
    `
    mutation {
        newAppareil(nom: "Geologue"
            adresse_ip: "192.168.56.6",
            adresse_mac: "00:1B:44:11:3A:B8",
            batterie: 70
            equipe: 2,
            naomark: 114,
        ){id}
    }
    `
]

function insertAppareil(appareil) {
    return new Promise(function(resolve, reject) {
        let newAppareil = {
            query: appareil
        };
        let reponse = request(newAppareil);
        reponse.then(function(value) {
            console.log(value.json().then(function(values) {
                console.log(values);
                resolve();
            }));
        });
    });
}

let dialogues = [
`
    mutation {
        newDialogue_Pepper(
            id: "act1_sce1_dialogue1",
            id_seance: 1,
            dialogue: "Bonjour la classe de CM2 et bienvenue au musée d'Angoulême. Je suis Pepper, vous êtes prêts à jouer avec moi !",
            animation: "animations/Stand/Gestures/Hey_1",
            phrase: "\\\\emph=2\\\\Bonjour la classe de CM2 et bienvenue au musée d'Angoulême. \\\\pau=1500\\\\ Je suis Pepper, vous êtes prêts à jouer avec moi ?"
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act1_sce1_dialogue2",
            id_seance: 1,
            dialogue: "Approchez et installez vous face à moi pour qu'on puisse commencer une partie",
            animation: "animations/Stand/Gestures/ShowFloor_1",
            phrase: "Approchez et installez vous face à moi pour qu'on puisse commencer une partie"
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act1_sce2_dialogue1",
            id_seance: 1,
            dialogue: "Au cours de cette partie vous allez aider mon amie Rose en découvrant le musée et ses secrets. Et j'espère que vous allez bien vous amuser !",
            animation: "animations/Stand/Gestures/ShowFloor_1",
            phrase: "Au cours de cette partie vous allez aider mon amie Rose en découvrant le musée et ses secrets. \\\\pau=150\\\\ Et j'espère que vous allez bien vous amuser !"
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act1_sce2_dialogue2",
            id_seance: 1,
            dialogue: "Pour cela je vais vous confier une tablette par équipe.",
            animation: "animations/Stand/Gestures/ShowFloor_1",
            phrase: "Pour cela je vais vous confier une tablette par équipe."
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act1_sce2_dialogue3",
            id_seance: 1,
            dialogue: "Grâce à cette tablette vous pourrez suivre l'aventure de Rose et l'aider à résoudre des énigmes en utilisant les collections du musée.",
            animation: "animations/Stand/Gestures/ShowFloor_1",
            phrase: "Grâce à cette tablette vous pourrez suivre l'aventure de Rose et l'aider à résoudre des énigmes en utilisant les collections du musée."
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act2_sce1_dialogue1",
            id_seance: 1,
            dialogue: "Commençons la distribution !",
            phrase: "Commençons la distribucion !",
            animation: "animations/Stand/BodyTalk/BodyTalk_14",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act2_sce1_dialogue2",
            id_seance: 1,
            dialogue: "Je vais vous appeler équipe par équipe et vous viendrez récupérer votre tablette sur la table qui se trouve à ma gauche."
            animation: "animations/Stand/BodyTalk/BodyTalk_10",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act2_sce2_start",
            id_seance: 1,
            dialogue: "J'appel l'équipe @equipe .<br> @joueurs Prenez votre tablette et venez me montrer le marqueur au dos.",
            phrase: "\\\\emph=2\\\\Bonjour l'équipe @equipe . @joueurs Prenez votre tablette et venez me montrer le marqueur au dos."
            animation: "animations/Stand/Gestures/Hey_3",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act2_sce2_ok",
            id_seance: 1,
            dialogue: "Bravo c'est la bonne tablette, vous êtes prêts pour l'aventure, allez vous placer un peu plus loin pour débuter le jeu.",
            animation: "animations/Stand/Gestures/Yes_2",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act2_sce2_ko",
            id_seance: 1,
            dialogue: "Regarde mieux sur la table, ce n'est pas la bonne tablette.",
            animation: "animations/Stand/Gestures/No_3",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act2_sce3_dialogue1",
            id_seance: 1,
            dialogue: "Je vous laisse débuter l'aventure, à tout à l'heure !",
            animation: "animations/Stand/Gestures/BodyTalk_6",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act3_sce1_dialogue1",
            id_seance: 1,
            dialogue: "Bon retour ! La classe de CM2 d'Angoulême.",
            animation: "animations/Stand/BodyTalk/BodyTalk_12",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act3_sce1_dialogue2",
            id_seance: 1,
            dialogue: "Prouvez-moi que vous avez récupéré toutes les clés.",
            animation: "animations/Stand/BodyTalk/BodyTalk_3",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act3_sce2_ok",
            id_seance: 1,
            dialogue: "Parfait, vous avez récupérés toutes les clés ! Déposez la tablette sur la table. Attendez sur le côté que la conférence commence.",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act3_sce2_ko",
            id_seance: 1,
            dialogue: "OH ! je ne connais pas cette tablette !",
        ){id}
    }
    `,
    `
    mutation {
        newDialogue_Pepper(
            id: "act4_sce1_dialogue1",
            id_seance: 1,
            dialogue: "Tout le monde est présent ! Dépêchez-vous, la conférence va commencer.",
            animation: "animations/Stand/Emotions/Positive/Peaceful_1"
        ){id}
    }
    `
]

function insertDialogue(dialogue) {
    return new Promise(function(resolve, reject) {
        let newDialogue = {
            query: dialogue
        };
        let reponse = request(newDialogue);
        reponse.then(function(value) {
            console.log(value.json().then(function(values) {
                console.log(values);
                resolve();
            }));
        });
    });
}

let joueurs = [
`
    mutation {
        newJoueur(nom: "Dupont", prenom: "Jeremy", role: "Historien", id_equipe: 1)
        {nom}
    }
`,
`
    mutation {
        newJoueur(nom: "Dubois", prenom: "Jeanne", role: "Paléontologue", id_equipe: 1)
        {nom}
    }
`,
`
    mutation {
        newJoueur(nom: "Durand", prenom: "Arthur", role: "Géologue", id_equipe: 1)
        {nom}
    }
`,
`
    mutation {
        newJoueur(nom: "Le Franc", prenom: "François", role: "Préhistorien", id_equipe: 1)
        {nom}
    }
`,
`
    mutation {
        newJoueur(nom: "De La Bath", prenom: "Hubert", role: "Géologue", id_equipe: 2)
        {nom}
    }
`,
`
    mutation {
        newJoueur(nom: "Dutrant", prenom: "Alice", role: "Historien", id_equipe: 2)
        {nom}
    }
`,
`
    mutation {
        newJoueur(nom: "Jean-Pierre", prenom: "Pierre", role: "Préhistorien", id_equipe: 2)
        {nom}
    }
`,
`
    mutation {
        newJoueur(nom: "Gaston", prenom: "Michael", role: "Paléontologue", id_equipe: 2)
        {nom}
    }
`
]

function insertJoueurs(joueur) {
    return new Promise(function(resolve, reject) {
        let newJoueurs = {
            query: joueur
        };
        let reponse = request(newJoueurs);
        reponse.then(function(value) {
            console.log(value.json().then(function(values) {
                console.log(values);
                resolve();
            }));
        }); 
    });
}

/*
insertStoryBoard().then(function() {
    insertSeance().then(function() {
        insertEquipes().then(function() {
            insertAppareil().then(function() {
                dialogues.forEach(element => {
                    insertDialogue(element);
                });
                joueurs.forEach(element => {
                    insertJoueurs(element);
                });
            });
        });
    });
});
*/

function insertAll() {
    insertStoryBoard().then(function() {
        insertSeance().then(function() {
            insertEquipeOrder(equipes, 0).then(function() {
                appareils.forEach(function(element) {
                    insertAppareil(element);
                });
                
                dialogues.forEach(element => {
                    insertDialogue(element);
                });
                
                joueurs.forEach(element => {
                    insertJoueurs(element);
                });   
            });
        });
    });
}

function insertEquipeOrder(sequipes, index) {
    return new Promise(function(resolve, reject) {
        if(index >= sequipes.length){
            resolve();
        }else {
            insertEquipe(sequipes[index]).then(function() {
                let i = index + 1;
                insertEquipeOrder(sequipes, i).then(function() {
                    resolve();
                });
            });
        }
    });
}

insertAll();

