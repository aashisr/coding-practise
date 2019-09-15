import React from 'react';
// ApolloClient needs to be imported as below, no combination to avoid errors
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Launches from './components/Launches';
import Launch from './components/Launch';
import './App.css';
import './css/cyborg-bootstrap.min.css';
import logo from './logo.png';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className='container'>
                    <img src={logo} alt='SpaceX' style={{ width: 300, display: 'block', margin: 'auto' }}></img>
                    <Route exact path='/' component={Launches} />
                    <Route exact path='/launch/:flight_number' component={Launch} />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
