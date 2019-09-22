import React from 'react';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-xs-12'>
                        <h1>The Main Page</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12'>
                        <button className='btn btn-success' onClick={() => this.props.changeUsername('Puks')}>
                            Change the username
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
