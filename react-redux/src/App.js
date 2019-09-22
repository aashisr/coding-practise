import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Main from './components/Main';
import User from './components/User';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        math: state.mathReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setname is a function that dispatches an action to the global redux store
        setName: (name) => {
            dispatch({
                type: 'SET_NAME',
                payload: name
            });
        }
    };
};

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Main changeUsername={this.props.setName}></Main>
                <User username={this.props.user.name}></User>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
