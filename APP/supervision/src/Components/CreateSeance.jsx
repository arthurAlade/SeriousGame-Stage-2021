import React, {Component} from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useMutation,
    gql, HttpLink,
    useQuery
} from "@apollo/client";

import Icon from '@mdi/react';
import { mdiPlusCircleOutline, mdiMinusCircleOutline } from '@mdi/js';

const NEW_SEANCE = gql`
    mutation newSeance($date: DateTime, $lieu: String!, $naomark: Int!, $NumStoryboard: Int, $classeEcole: String){
        newSeance(date :$date, lieu: $lieu, naomark: $naomark, NumStoryboard: $NumStoryboard, classeEcole: $classeEcole){
            id
        }
    }
`;

const NEW_EQUIPE = gql`
    mutation newEquipe($numSeance: Int!, $nom: String!, $role: String){
        newEquipe(numSeance :$numSeance, nom: $nom, role: $role){
            id
        }
    }
`;

const NEW_PLAYER = gql`
    mutation newJoueur($nom: String!, $prenom: String!, $role: String, $id_equipe: Int!){
        newJoueur(nom :$nom, prenom: $prenom, role: $role, id_equipe: $id_equipe){
            id
        }
    }
`;

const ALL_STORYBOARD = gql`
    query{
        getAllStoryboards {
            id
        }
    }
`;

const ALL_SEANCES = gql`
    query{
        getAllSeancesOrderByEtat{
            id
            naomark
            etat
        }
    }
`;

const compo = function() {
    return (
        CreateSeance()
    );
}

function GetAllStoryboards() {
    const {loading, error, data} = useQuery(ALL_STORYBOARD)
    if (loading) return <option>Loading...</option>;
    if (error) return <option>Error :(</option>;
    
    let storyboards = [];

    if(!loading) {
        if(data) {
            data.getAllStoryboards.map(st => {
                storyboards.push(<option key={st.id} value={st.id}>StoryBoard n°{st.id}</option>)
            });
        }
    }
    return storyboards;
}

function GetAllAvailableNaoMarkForSeance() {
    const {loading, error, data} = useQuery(ALL_SEANCES)
    if (loading) return <option>Loading...</option>;
    if (error) return <option>Error :(</option>;

    let naoMarks = [
        68,
        80,
        84,
        85,
        107,
        108,
        112,
        114,
        119
    ];

    let marks = [];

    if(!loading) {
        if(data) {
            data.getAllSeancesOrderByEtat.map(seance => {
                if(seance.etat !== "terminee") {
                    const index = naoMarks.indexOf(seance.naomark)
                    if(index != -1) {
                        naoMarks.splice(index, 1);
                    }
                }
            });
            for (let index = 0; index < naoMarks.length; index++) {
                marks.push(<option key={index} value={naoMarks[index]}>{naoMarks[index]}</option>);
            }
            return marks;
        }
    }

    return marks;
}

const CreateSeance = props => {

    let NomEquipe = [
        "Les Goonies",
        "Les Indianas",
        "Le club des AS",
        "Les Jumanji",
        "Les Marsupilamis",
        "Les Sherlocks"
    ];

    let roles = [
        "Historien",
        "Géologue",
        "Préhistorien",
        "Paléontologue"
    ];

    const [infoForm, setInfoForm] = React.useState("");
    const [lieu, setLieu] = React.useState("");
    const [date, setDate] = React.useState("");
    const [Pepper, setPepper] = React.useState(false);
    const [NumStoryboard, setNumStoryboard] = React.useState(1);
    const [naomark, setNaomark] = React.useState();
    const [classeEcole, setClasseEcole] = React.useState("");
    const [seance, { data }] = useMutation(NEW_SEANCE);
    const [equipe, { dataEquipe }] = useMutation(NEW_EQUIPE);
    const [joueur, { dataJoueur}] = useMutation(NEW_PLAYER);
    const [teamIndex, setTeamIndex] = React.useState(4);

    const [Teams, setTeams] = React.useState([
        {index: 0, role: "", joueurs: [
            {index: 0,nom: "", prenom: "", role: roles[0]},
            {index: 1,nom: "", prenom: "", role: roles[1]},
            {index: 2,nom: "", prenom: "", role: roles[2]},
            {index: 3,nom: "", prenom: "", role: roles[3]},
        ],},
        {index: 1, role: "", joueurs: [
            {index: 0,nom: "", prenom: "", role: roles[0]},
            {index: 1,nom: "", prenom: "", role: roles[1]},
            {index: 2,nom: "", prenom: "", role: roles[2]},
            {index: 3,nom: "", prenom: "", role: roles[3]},
        ],},
        {index: 2, role: "", joueurs: 
            [{index: 0,nom: "", prenom: "", role: roles[0]},
            {index: 1,nom: "", prenom: "", role: roles[1]},
            {index: 2,nom: "", prenom: "", role: roles[2]},
            {index: 3,nom: "", prenom: "", role: roles[3]},
        ],},
        {index: 3, role: "", joueurs: [
            {index: 0,nom: "", prenom: "", role: roles[0]},
            {index: 1,nom: "", prenom: "", role: roles[1]},
            {index: 2,nom: "", prenom: "", role: roles[2]},
            {index: 3,nom: "", prenom: "", role: roles[3]},
        ],},
    ]);

    const addTeam = () => {
        if(Teams.length <6) {
            setTeams([...Teams, {...{index: teamIndex, role: "", joueurs: [
                                                                    {index: 0, nom: "", prenom: "", role: roles[0]},
                                                                    {index: 1, nom: "", prenom: "", role: roles[1]},
                                                                    {index: 2, nom: "", prenom: "", role: roles[2]},
                                                                    {index: 3, nom: "", prenom: "", role: roles[3]},
                                                                ],}}])
            setTeamIndex(teamIndex+1);
        }else {
            console.log("maximum number of Teams");
        }
    };

    const removeTeam = (index) => {
        if(Teams.length != 4) {
            setTeams(Teams.filter(item => item.index !== index))
        }else {
            console.log("minimum number of Teams");
        }
    };

    const addPlayer = (i) => {
        let position = 0;
        for (let index = 0; index < Teams.length; index++) {
            if(Teams[index].index == i) {
                position = index;
            }
        }
        if(Teams[position].joueurs.length < 6) {
            setTeams(Teams.filter(function(team) {
                if(team.index == Teams[position].index) {
                    team.joueurs.push({index: team.joueurs.length, nom: "", prenom: "", role: roles[0]});
                }
                return team;
            }));
        }else {
            console.log("Maximum number of player for this team");
        }
    };

    const updateNomPlayer = (i, joueurIndex, nom) => {
        let position = 0;
        for (let index = 0; index < Teams.length; index++) {
            if(Teams[index].index == i) {
                position = index;
            }
        }
        setTeams(Teams.filter(function(team) {
            if(team.index == Teams[position].index) {
                team.joueurs = team.joueurs.filter(function(joueur){
                    if(joueur.index == joueurIndex) {
                        joueur.nom = nom;
                    }
                    return joueur;
                });
            }
            return team;
        }));
    };

    const updatePrenomPlayer = (i, joueurIndex, prenom) => {
        let position = 0;
        for (let index = 0; index < Teams.length; index++) {
            if(Teams[index].index == i) {
                position = index;
            }
        }
        setTeams(Teams.filter(function(team) {
            if(team.index == Teams[position].index) {
                team.joueurs = team.joueurs.filter(function(joueur){
                    if(joueur.index == joueurIndex) {
                        joueur.prenom = prenom;
                    }
                    return joueur;
                });
            }
            return team;
        }));
    };

    const updateRolePlayer = (i, joueurIndex, role) => {
        let position = 0;
        for (let index = 0; index < Teams.length; index++) {
            if(Teams[index].index == i) {
                position = index;
            }
        }
        setTeams(Teams.filter(function(team) {
            if(team.index == Teams[position].index) {
                team.joueurs = team.joueurs.filter(function(joueur){
                    if(joueur.index == joueurIndex) {
                        joueur.role = role;
                    }
                    return joueur;
                });
            }
            return team;
        }));
    }
    
    const removePlayer = (i, joueurIndex) => {
        let position = 0;
        for (let index = 0; index < Teams.length; index++) {
            if(Teams[index].index == i) {
                position = index;
            }
        }
        if(Teams[position].joueurs.length > 4) {
            setTeams(Teams.filter(function(team) {
                if(team.index == Teams[position].index) {
                    team.joueurs = team.joueurs.filter(joueur => joueur.index !== joueurIndex);
                }
                return team;
            }));
        }else {
            console.log("Minimum number of player for this team");
        }
    };

    function changePepper() {
        if(Pepper) {
            setPepper(false);
        }else {
            setPepper(true);
        }
    }

    function validateForm() {
        let state = true;
        //check all parameters
        if(!lieu) {
            if(state) setInfoForm("Erreur: Lieu non défini !");
            state=false;
        }
        if(!classeEcole) {
            if(state) setInfoForm("Erreur: Classe non définie !");
            state = false;
        }
        if(!date) {
            if(state) setInfoForm("Erreur: Date non définie !");
            state = false;
        }
        if(!naomark) {
            if(state) setInfoForm("Erreur: Naomark non définie !");
            state = false;
        }
        Teams.forEach(team => {
            team.joueurs.forEach(player => {
                if(!player.nom || !player.prenom || !player.role) {
                    if(state) setInfoForm("Erreur: Merci de remplir toutes les informations des joueurs !");
                    state = false;
                }
            });
            
        });
        return state;
    }

    function createSeanceInDb(event) {
        event.preventDefault();
        if(validateForm()) {
            seance( {
                variables: { 
                    date: date,
                    lieu: lieu,
                    naomark: naomark,
                    NumStoryboard: NumStoryboard,
                    classeEcole: classeEcole
                }
            }).then(function(response) {
                createTeamsDB(response.data.newSeance.id, 0).then(function() {
                    console.log("Equipes & joueurs créers");
                    alert("Séance créée")
                });
            });
        }
    }

    function createTeamsDB(idSeance, index) {
        return new Promise(function(resolve, reject) {
            if(index < Teams.length) {
                equipe( {
                    variables: {
                        numSeance: idSeance,
                        nom: NomEquipe[index],
                        role: Teams[index].role,
                    }
                }).then(function(response) {
                    createPlayerForOneTeamDB(response.data.newEquipe.id, index).then(function() {
                        createTeamsDB(idSeance, index+1).then(function() {
                            resolve();
                        })
                    })
                });
            }else {
                resolve();
            }
        })
    }

    function createPlayerForOneTeamDB(team, index) {
        return new Promise(function(resolve, reject) {
            Teams[index].joueurs.forEach(player => {
                joueur( {
                    variables: {
                        nom: player.nom,
                        prenom: player.prenom,
                        role: player.role,
                        id_equipe: team,
                    }
                }).then(function() {
                    resolve();
                });
            });
        });
    }

    function listeRoles() {
        let tabRoles = [];

        for (let index = 0; index < roles.length; index++) {
            const role = roles[index];
            tabRoles.push(<option key={index} value={role}>{role}</option>);
        }
        return tabRoles;
    }

    const [loadTeamBool, setLoadTeamBool] = React.useState(false);
    function loadTeam() {
        let tablePlayer = [
            {
                joueurs : [
                    {nom: "Dupont", prenom: "Jeremy"},
                    {nom: "Martin", prenom: "Alice"},
                    {nom: "John", prenom: "Frank"},
                    {nom: "Perrin", prenom: "Théo"}
                ]
            },{
                joueurs : [
                    {nom: "Dupont", prenom: "Martine"},
                    {nom: "Martin", prenom: "Bernadette"},
                    {nom: "Doe", prenom: "John"},
                    {nom: "Girard", prenom:"Frank"}
                ]
            },
            {
                joueurs : [
                    {nom: "Bennet", prenom: "Elizabeth"},
                    {nom: "Valjean", prenom: "Jean"},
                    {nom: "Legrand", prenom:"Mikela"},
                    {nom: "Fontaine", prenom:"Nolann"}
                ]
            },{
                joueurs : [
                    {nom: "Fabre", prenom: "Arnaud"},
                    {nom: "Moreau", prenom: "Delphine"},
                    {nom: "Lucas", prenom:"Mohamed"},
                    {nom: "Adam", prenom:"Clara"}
                ]
            }
        ];
        if(!loadTeamBool) {
            setLoadTeamBool(true);
            for (let i =0; i < tablePlayer.length; i++){
                for (let j =0; j <tablePlayer[i].joueurs.length; j++){

                    setTeams(Teams.filter(function(team) {
                        if(team.index == Teams[i].index) {
                            team.joueurs[j].nom = tablePlayer[i].joueurs[j].nom;
                            team.joueurs[j].prenom = tablePlayer[i].joueurs[j].prenom;

                        }
                        return team;
                    }));
                }
            }
        }
        else{
            setLoadTeamBool(false);
            for (let i =0; i < tablePlayer.length; i++){
                for (let j =0; j <tablePlayer[i].joueurs.length; j++){
                    setTeams(Teams.filter(function(team) {
                        if(team.index == Teams[i].index) {
                            team.joueurs[j].nom = "";
                            team.joueurs[j].prenom = "";
                        }
                        return team;
                    }));
                }
            }

        }
    }

    return (
        <div className="CreateSeance">
            <form onSubmit={createSeanceInDb}>
                <div className="formContent">
                    <div className="formContentItemTitle">
                        <p>Outil de création de scéance</p>
                    </div>
                    <div className="formContentItemParameters">
                        <div className="Paramters">
                            <div>
                                <label>
                                    Lieu
                                </label>
                                <input type="text"
                                    onChange={
                                        (event) => {
                                            setLieu(event.target.value);
                                        }
                                    }
                                />
                            </div>
                            <div>
                                <label>
                                    Classe
                                </label>
                                <input type="text"
                                    onChange={
                                        (event) => {
                                            setClasseEcole(event.target.value);
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className="Paramters">
                            <div>
                                <label>
                                    Date
                                </label>
                                <input type="datetime-local"
                                    onChange={
                                        (event) => {
                                            setDate(event.target.value);
                                        }
                                    }
                                />
                            </div>
                            <div>
                                <label>
                                    Naomark
                                </label>
                                <select onChange= {
                                            (event) => {
                                                setNaomark(parseInt(event.target.value, 10));
                                            }
                                        }
                                >
                                    <GetAllAvailableNaoMarkForSeance/>
                                </select>
                            </div>
                        </div>
                        <div className="Paramters">
                            <div>
                                <label>
                                    StoryBoard Pepper
                                </label>
                                <input type="checkbox"
                                    onChange= {
                                        (event) => {
                                            changePepper();
                                        }
                                    }
                                />
                                <select disabled={!Pepper}
                                    onChange= {
                                        (event) => {
                                            setNumStoryboard(event.target.value);
                                        }
                                    }
                                >
                                    <GetAllStoryboards/>
                                </select>
                            </div>
                            <div>
                                <label>
                                    Pré-remplir équipes
                                </label>
                                <input type="checkbox"
                                    onChange= {
                                        (event) => {
                                            loadTeam();
                                        }
                                    }
                                />
                            </div>
                            <div>
                                <p className="infoForm">{infoForm}</p>
                            </div>
                        </div>
                    </div>
                    <div className="formContentItemTeams">
                        {Teams.map((obj, index) =>
                            <div className="team"
                                key={index}>
                                    <div className="teamHeader">
                                        <p>{NomEquipe[index]}</p>
                                        <Icon onClick={() => {removeTeam(Teams[index].index)}}
                                            path={mdiMinusCircleOutline}
                                            size={1}
                                            horizontal
                                            vertical
                                            color="red">
                                        </Icon>
                                    </div>
                                    <div className="teamBody">
                                        {obj.joueurs.map((joueur, numero) => 
                                            <div className="player"
                                            key={joueur.index}>
                                                <input placeholder="Nom"
                                                    onChange= {
                                                        (event) => {
                                                            updateNomPlayer(obj.index, joueur.index, event.target.value);
                                                        }
                                                    }
                                                    type="text" defaultValue={joueur.nom}></input>
                                                <input placeholder="Prenom" 
                                                    onChange= {
                                                        (event) => {
                                                            updatePrenomPlayer(obj.index, joueur.index, event.target.value);
                                                        }
                                                    }
                                                    type="text" defaultValue={joueur.prenom}></input>
                                                <select value={joueur.role}
                                                    onChange= {
                                                        (event) => {
                                                            updateRolePlayer(obj.index, joueur.index, event.target.value);
                                                        }
                                                    }
                                                >
                                                        {listeRoles()}
                                                </select>
                                                <Icon size={1}
                                                color="red"
                                                    onClick={
                                                        () => {
                                                            removePlayer(obj.index, joueur.index);
                                                        }
                                                    }
                                                    path={mdiMinusCircleOutline}/>
                                            </div>
                                        )}
                                        <div className="player">
                                            <Icon size={2}
                                                color="#EDBB99"
                                                onClick={
                                                    () => {addPlayer(obj.index)}
                                                }
                                                path={mdiPlusCircleOutline}></Icon>
                                        </div>
                                    </div>
                            </div>)
                        }
                        <div className="team">
                            <Icon path={mdiPlusCircleOutline}
                                color="#EDBB99"
                                onClick={() => {addTeam()}}></Icon>
                        </div>
                    </div>
                    <div className="formContentItemSubmit">
                        <button className="SeanceInputSub" type="submit">Créer</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default compo;