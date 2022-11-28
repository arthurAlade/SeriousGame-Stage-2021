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

const GET_LOGS = gql`
    query{
        getLogs{
            id
            date
            seance{
                id
            }
            equipe{
                id
            }
            type
            description
            appareil{
                id
            }
        }
    }
`;



function createRowLog(id, date, IDSeance, type, IDEquipe, IDappareil, description){
    return (
        <tr>
            <th>{id}</th>
            <th>{date}</th>
            <th>{IDSeance}</th>
            <th>{type}</th>
            <th>{IDEquipe}</th>
            <th>{IDappareil}</th>
            <th>{description}</th>
        </tr>
    );
}
function GetLog() {
    const {loading, error, data} = useQuery(GET_LOGS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let tab = [];
    //id, date, IDSeance, type, IDEquipe, IDappareil, description
    data.getLogs.map(log => {
        console.log(log);
        let seance = null;
        let appareil = null;
        let equipe = null;
        if(log.seance != null){
            seance = log.seance.id;
        }
        if(log.appareil != null){
            appareil = log.appareil.id;
        }
        if(log.equipe!= null){
            equipe = log.equipe.id;
        }
        tab.push(createRowLog(log.id, log.date, seance, log.type, equipe, appareil,log.description));
    });
    return(
        <table className="table-log">
            <thead className="table-log-thead">
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Séance</th>
                <th>Type</th>
                <th>Équipe</th>
                <th>Appareil</th>
                <th>Description</th>
            </tr>
            </thead>
                <tbody className="table-log-content">
                {tab.reverse()}
                </tbody>
        </table>
    )
}

export default class GetAllLogComponent extends Component {
    render(){
        return(
            <>
                <div className="log-table-component">
                    <h1>Log</h1>
                    <GetLog />
                </div>
            </>
        )
    };
}
