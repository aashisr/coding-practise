import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import LaunchItem from './LaunchItem';

// Create a query to get the launches data
// query LaunchesQuery is the name given to the query, it is optional
const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;

function Launches() {
    return (
        <div>
            <h1 className='display-4 my-3'>Launches</h1>
            <Query query={LAUNCHES_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <h4>Loading....</h4>;
                    if (error) {
                        console.log(error);
                        return <h4>Error: error</h4>;
                    }

                    console.log(data);
                    return (
                        <Fragment>
                            {data.launches.map((launch) => (
                                <LaunchItem key={launch.flight_number} launch={launch}></LaunchItem>
                            ))}
                        </Fragment>
                    );
                }}
            </Query>
        </div>
    );
}

export default Launches;
