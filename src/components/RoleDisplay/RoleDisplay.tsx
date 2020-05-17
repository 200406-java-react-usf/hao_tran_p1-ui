
import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';

import { User } from '../../models/user';
import { Redirect } from 'react-router-dom';

interface IRoleProps {
    authUser: User;
}

function RoleDisplay(props: IRoleProps) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    return (
        <>
            <div >
                USERNAME
                {username}
            </div>
        </>
    );

}

export default RoleDisplay;