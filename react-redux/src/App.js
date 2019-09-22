import React from 'react';

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
