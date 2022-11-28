import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useMutation,
    gql, HttpLink
} from "@apollo/client";
import '../index.css'



const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3301/api',
    }),
    cache: new InMemoryCache()
});

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
    `,
    `
    mutation {
        newEquipe(numSeance: 2,
            nom: "Le club des AS",
            role: "Historien")
        {id}
    }
    `,
    `
    mutation {
        newEquipe(numSeance: 2,
            nom: "Les Jumanji",
            role: "Paléontologue")
        {id}
    }
    `
]

const NEW_EQUIPE = gql`
    mutation newEquipe($numSeance: Int!, $nom: String!, $role: String){
        newEquipe(numSeance: $id, nom: $nom, role: $role){
            id
            nom
            role
        }
    }
`;
function Insert () {
    return <>
    </>
}


export default class InsertEquipe extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                <ApolloProvider client={client}>
                    <Insert/>
                </ApolloProvider>
            </>)
    };
}
