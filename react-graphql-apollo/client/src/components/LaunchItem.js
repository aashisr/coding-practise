import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function LaunchItem(props) {
    return (
        <div className='card card-body mb-3'>
            <div className='row'>
                <div className='col-md-9'>
                    <h4>
                        Mission: <span className={props.launch.launch_success ? 'text-success' : 'text-danger'}>{props.launch.mission_name}</span>
                    </h4>
                    <p>
                        Date: <Moment format='DD.MM.YYYY HH:mm'>{props.launch.launch_date_local}</Moment>
                    </p>
                </div>
                <div className='col-md-3'>
                    <Link to={`/launch/${props.launch.flight_number}`} className='btn btn-secondary'>
                        Launch Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
