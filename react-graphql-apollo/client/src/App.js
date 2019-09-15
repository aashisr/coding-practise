import React from 'react';
// ApolloClient needs to be imported as below, no combination to avoid errors
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';
import './css/cyborg-bootstrap.min.css';
import logo from './logo.png';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className='container'>
                <img src={logo} alt='SpaceX' style={{ width: 300, display: 'block', margin: 'auto' }}></img>
            </div>
        </ApolloProvider>
    );
}

export default App;