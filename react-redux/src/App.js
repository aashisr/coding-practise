import React from 'react';
import { createStore } from 'redux';

import './App.css';
import Main from './components/Main';
import User from './components/User';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: 'Aashis'
        };
    }

    changeUsername(newname) {
        this.setState({
            username: newname
        });
    }

    render() {
        return (
            <div className='container'>
                <Main changeUsername={this.changeUsername.bind(this)}></Main>
                <User username={this.state.username}></User>
            </div>
        );
    }
}

export default App;

// Create an initial state object
const initialState = {
    result: 1,
    lastValues: []
};

// Define a reducer
// Reducer always takes two arguments, first is the initial state and second is the action to be performed in the state
// These arguments are passed automatically by redux
// Should always return the state
// Set initial state as the default state
const reducer = (state = initialState, action) => {
    // return different modifications of state based on the action
    switch (action.type) {
        case 'Add':
            // Add the payload value to the existing state value
            // Do not change the original value of the state (do not mutate the state)
            state = {
                // Copy the original state, and replace the value of result with a new value
                ...state,
                result: state.result + action.payload,
                // Collect the state values in lastValues array
                // For that, copy all the lastValues from the original array and push the new one
                lastValues: [...state.lastValues, action.payload]
            };
            return state;
        case 'SUBTRACT':
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            return state;
        default:
            return state;
    }
};

// Create a store where all the states are stored
// Always takes two arguments, reducer and the initial state of the application
// Initial state is now handled by the reducer itself. So, removed form createStore function
// Store does not handle the actions, it only knows who is handling the actions (it is reducer)
const store = createStore(reducer);

// Gets executed whenever the state is updated
// store.getState gives the new updated state
store.subscribe(() => {
    console.log('Store updated: ', store.getState());
});

// dispatch dispatches the action to the store
// and store sends the action to the reducer
// dispatch expects a javascript object
store.dispatch({
    type: 'ADD',
    payload: 10 // payload is the value passed to the reducer
});
