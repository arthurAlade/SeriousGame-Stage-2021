import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql, HttpLink, useMutation
} from "@apollo/client";
import '../index.css'
import {Link, useLocation} from "react-router-dom";


const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3301/api',
    }),
    cache: new InMemoryCache()
});


const ONE_SEANCE = gql`
    query getOneSeance($id: Int!){
        getOneSeance(id: $id){
            id
            date
            naomark
            etat
            lieu
            storyboard{
                id
            }
        }
    }
`;


function createDivSeance(equipe, key,nombreJoueurs){
    let url = "/equipe/"+equipe.id
    return (
        <div className="square" key={key}>
            <Link to={url}>
                <div className="squareHaut">
                    <p>{equipe.nom}</p>
                    <p>{equipe.role}</p>
                </div>
                <div className="squareCentral-seance">
                    <p>
                        {nombreJoueurs} Joueurs
                    </p>
                </div>
                <div>Enigme</div>
                <div></div>
            </Link>
        </div>
    );
}
const GET_EQUIPE = gql`
    query getAllEquipesBySeance($id: Int!){
        getAllEquipesBySeance(numSeance: $id)
        {
            id
            nom
            role
            joueurs{
                nom
                prenom
                role
            }
            tablette{
                nom
                adresse_ip
                adresse_mac
                naomark
                log{
                    date
                    type
                    description
                }
            }
        }
    }
`;
const SET_ETAT_SEANCE = gql`
    mutation setEtatSeance($id: Int!, $etat: String!){
        setEtatSeance(id:$id, etat:$etat){
            id
            etat
        }
    }
`;

function GetLocation(){
    let location = useLocation();
    let value  = location.pathname.substr(8)
    return Number(value);
}
function GetSeanceEquipes() {
    let  ID = GetLocation();
    const {loading, error, data} = useQuery(GET_EQUIPE, {
        variables: { id: ID },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let tab = [];
    data.getAllEquipesBySeance.map(equipe => {
        tab.push(createDivSeance(equipe, equipe.id, equipe.joueurs.length));
    });
    return tab
}


const GetSeanceComponent = props => {
    const [etatSeance, setEtatSeance] = React.useState("");
    const [etatSeanceBouton, setEtatBouton] = React.useState();
    const [seance, { data }] = useMutation(SET_ETAT_SEANCE);
    const [idSeance, setIdSeance] = React.useState(0);


    function Informations() {
        let  ID = GetLocation();
        const {loading, error, data} = useQuery(ONE_SEANCE, {
            variables: { id: ID },
        });
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        setEtatSeance(data.getOneSeance.etat);
        setIdSeance(data.getOneSeance.id)
        return (
            <>
                <h2>Musée {data.getOneSeance.lieu}</h2>
                <p>{data.getOneSeance.date}</p>
                <p>Storyboard Pepper : {data.getOneSeance.storyboard.id}</p>
                <p>{etatSeance}</p>
            </>
        );
    }
    function SetState(){
        if(etatSeance === "enAttente") {
            let etat = "creer"
            seance( {
                variables: {
                    id : idSeance,
                    etat : etat
                }});
            setEtatSeance("creer");
        }else if (etatSeance === "creer"){
            let etat = "enAttente"
            seance( {
                variables: {
                    id : idSeance,
                    etat : etat
                }});
            setEtatSeance("enAttente");
        }
    }

    return(
        <>
            <div className="App-container">
                <div className="App-informations">
                    <Informations />
                    <div>
                        <label>
                            Séance prête ?
                        </label>
                        <input type="checkbox" value
                               onChange= {
                                   (event) => {
                                       SetState();
                                   }
                               }
                        />
                    </div>
                </div>
                <div className="App-content">
                    <ApolloProvider client={client}>
                        <GetSeanceEquipes/>
                    </ApolloProvider>
                </div>
            </div>
        </>
    );
};

export default GetSeanceComponent;
