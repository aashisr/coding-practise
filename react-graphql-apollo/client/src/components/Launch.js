import React, { Fragment } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// Create a graphql query to fetch a launch object
const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

export default function Launch(props) {
    // Use destructurig to get the flight number from the params in props
    let { flight_number } = props.match.params;
    // Convert the flight_number to integer
    flight_number = parseInt(flight_number);
    console.log(flight_number);

    return (
        <Fragment>
            <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
                {({ loading, error, data }) => {
                    if (loading) return <h4>Loading...</h4>;
                    if (error) console.log(error);

                    // Pull the contents of the data.launch using destructuring
                    const {
                        mission_name,
                        flight_number,
                        launch_year,
                        launch_date_local,
                        launch_success,
                        rocket: { rocket_id, rocket_name, rocket_type }
                    } = data.launch;

                    return (
                        <div>
                            <h1 className='display-4 my-3'>
                                <span className='text-dark'>Mission:</span> {mission_name}
                            </h1>
                            <h4 className='mb-3'>Launch Details</h4>
                            <ul className='list-group'>
                                <li className='list-group-item'>Flight Number: {flight_number}</li>
                                <li className='list-group-item'>
                                    Lauch Date: <Moment format='DD.MM.YYYY HH:mm'>{launch_date_local}</Moment>
                                </li>
                                <li className='list-group-item'>
                                    Lauch Successful:{' '}
                                    <span className={launch_success ? 'text-success' : 'text-danger'}>{launch_success ? 'Yes' : 'No'}</span>
                                </li>
                                <li className='list-group-item'>Lauch Year: {launch_year}</li>
                            </ul>

                            <h4 className='my-3'>Rocket Details</h4>
                            <ul className='list-group'>
                                <li className='list-group-item'>Rocket Id: {rocket_id}</li>
                                <li className='list-group-item'>Rocket Name: {rocket_name}</li>
                                <li className='list-group-item'>Rocket Type: {rocket_type}</li>
                            </ul>
                            <hr />
                            <Link to='/' className='btn btn-secondary mb-3 float-right'>
                                Back
                            </Link>
                        </div>
                    );
                }}
            </Query>
        </Fragment>
    );
}
