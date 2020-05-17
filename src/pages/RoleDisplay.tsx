import React, { useState } from 'react';
import RoleDisplay from '../components/RoleDisplay/RoleDisplayContainer'

import { User } from '../models/user';
import { Redirect } from 'react-router-dom';


function Result() {
    const [readyState, setReadyState] = useState(false);

    return (
        <>
            <RoleDisplay />
        </>
    );

}

export default Result;