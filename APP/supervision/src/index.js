import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useMutation,
    gql, HttpLink
} from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3301/api',
    }),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </>,
    document.getElementById('root')
);
