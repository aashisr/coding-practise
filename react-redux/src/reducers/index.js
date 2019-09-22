import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

// Create an initial state object
const initialMathState = {
    result: 1,
    lastValues: []
};

// Define a reducer
// Reducer always takes two arguments, first is the initial state and second is the action to be performed in the state
// These arguments are passed automatically by redux
// Should always return the state
// Set initial state as the default state
const mathReducer = (state = initialMathState, action) => {
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

// Initial state for userReducer
const initialUserState = {
    name: 'Aashis',
    age: 25
};

// Create another reducer
const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_AGE':
            return { ...state, age: action.payload };
        default:
            return state;
    }
};

// Create a middleware
// next is the method provided by redux which must be executed to move forward
const myLogger = (store) => (next) => (action) => {
    console.log('Logged action: ', action);
    next(action);
};

// Create a store where all the states are stored
// Always takes two arguments, reducer and the initial state of the application
// Initial state is now handled by the reducer itself. So, removed form createStore function
// Store does not handle the actions, it only knows who is handling the actions (it is reducer)
// combineReducers combines different reducers in the app to be one since createStore takes only one reducer
// combineReducers({ mathReducer: mathReducer, userReducer: userReducer }) can be written as below if both key and value is same
const store = createStore(combineReducers({ mathReducer, userReducer }), {}, applyMiddleware(myLogger, logger()));

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
