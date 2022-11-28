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
import {
    Link,
    useHistory
} from "react-router-dom";
import SeanceDisplay from "./SeanceDisplay";


const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3301/api',
    }),
    cache: new InMemoryCache()
});

const ALL_SEANCES = gql`
    query{
        getAllSeancesOrderByEtat{
            id
            date
            lieu
            naomark
            etat
            storyboard{
                id
            }
            equipe{
                id
                nom
            }
        }
    }
`;

function createDivSeance(seance, key,nombreEquipe){
    console.log(nombreEquipe);
    let url = "/seance/"+seance.id
    let color;
    if(seance.etat === "creer"){
        color = "orangeState";
    }else if (seance.etat === "enCours"){
        color = "greenState";
    }
    else if (seance.etat ==="enAttente"){
        color = "blueState";
    }
    else {
        color = "redState";
    }
    return (
        <SeanceDisplay key={key} id={seance.id} nombreEquipe={nombreEquipe} seanceEtat={seance.etat} color={color}/>
    );
}

let nbSeancesEnCours = 0;
let nbSeancesCreer = 0;

function GetAllSeances() {
    const {loading, error, data} = useQuery(ALL_SEANCES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let tab = [];
    data.getAllSeancesOrderByEtat.map(seance => {
        tab.push(createDivSeance(seance, seance.id, seance.equipe.length));
        if(seance.etat==="creer"){
            //+=1;
        }
        else if(seance.etat==="enCours"){
            //enCours+=1;
        }
    });
    console.log(data.getAllSeances);
    return tab
}
function Informations() {
    console.log("INFORMATIONS creer :"+nbSeancesCreer+" en cours :"+nbSeancesEnCours);
    let date = new Date();
    return (
        <>
            <div className="globalInfoContent">
                <div className="globalInfoText">
                    <h2>Musée d'Angoulême</h2>
                    <p>{date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}</p>
                    <p>{date.getHours() + ":" + date.getMinutes()}</p>
                    <p>{} séances en cours</p>
                    <p>{} séances à venir</p>
                </div>
            </div>
        </>
    );
}

export default class GetAllSeancesComponent extends Component {
    constructor(props){
        super(props);
        let enCours;
        let creer;
    }
    render(){
        return(
            <>
                <div className="App-container">
                    <div className="App-informations">
                        <Informations  />
                    </div>
                    <div className="App-content">
                        <ApolloProvider client={client}>
                            <GetAllSeances/>
                        </ApolloProvider>
                    </div>
                </div>
            </>)
    };
}
