import React, { useState } from 'react';

import { User } from '../models/user';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Testing() {
    const [readyState, setReadyState] = useState(false);

    return (
        <>
            <Link to='/roledisplay'>Home</Link>
        </>
    );

}

export default Testing;