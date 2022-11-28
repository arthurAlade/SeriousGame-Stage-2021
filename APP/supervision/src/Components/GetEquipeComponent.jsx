import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql, HttpLink
} from "@apollo/client";
import '../index.css'
import {Link, useLocation} from "react-router-dom";

const GET_EQUIPE_JOUEURS = gql`
    query getOneEquipe($ID : Int!){
        getOneEquipe(id: $ID){
            id
            nom
            role
            joueurs{
                id
                nom
                prenom
                role
            }
        }
    }
`;
const GET_EQUIPE_LOG = gql`
    query getOneEquipe($ID : Int!){
        getOneEquipe(id: $ID){
            id
            log{
                id
                type
                appareil{
                    id
                }
                description
                date
            }
        }
    }
`;
function GetLocation(){
    let location = useLocation();
    let value  = location.pathname.substr(8)
    return Number(value);
}
function createDivJoueurs(key,nom, prenom, role){
    return (
        <div className="equipe" key={key}>
            <h2>{nom} {prenom}</h2>
            <p>{role}</p>
        </div>
    );
}
function createDivEquipe(key, nom, role){
    return(
        <div className="equipe" key={key}>
            <h1>{nom}</h1>
            <p>{role}</p>
        </div>
    );
}
function GetEquipe() {
    let  ID = GetLocation();
    const {loading, error, data} = useQuery(GET_EQUIPE_JOUEURS, {
        variables: { ID: ID },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let tab = [];
    tab.push(createDivEquipe(data.getOneEquipe.id, data.getOneEquipe.nom, data.getOneEquipe.role));
    //data.getOneEquipe.
    data.getOneEquipe.joueurs.map(joueur => {
        //console.log(joueur);
        tab.push(createDivJoueurs(joueur.id, joueur.nom, joueur.prenom, joueur.role));
    });
    return tab
}
function createRowLog(date, type, description, IDappareil){
    return (
        <tr>
            <th>{date}</th>
            <th>{type}</th>
            <th>{IDappareil}</th>
            <th>{description}</th>
        </tr>
    );
}
function GetLog() {
    let  ID = GetLocation();
    const {loading, error, data} = useQuery(GET_EQUIPE_LOG, {
        variables: { ID: ID },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let tab = [];
    data.getOneEquipe.log.map(log => {
        console.log(log);
        if(log.appareil==null){
            tab.push(createRowLog(log.date, log.type, log.description))
        }
        else {
            tab.push(createRowLog(log.date, log.type, log.description, log.appareil.id));
        }
    });
    return(
        <table>
            <thead className="table-log">
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Tablette</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody className="table-log-content">
                    {tab.reverse()}
            </tbody>
        </table>
    )
}

export default class GetEquipeComponent extends Component {
    render(){
        return(
            <>
                <div className="App-container">
                    <div className="App-informations">
                        <GetEquipe />
                    </div>
                    <div className="App-content-equipe">
                        <h1>Avancement</h1>
                        <p>🚧</p>
                        <h1>Log</h1>
                        <GetLog />
                    </div>
                </div>
            </>)
    };
}
