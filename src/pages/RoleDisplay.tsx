import React, { useState } from 'react';
import RoleDisplay from '../components/RoleDisplay/RoleDisplayContainer'
import "../style/roleDisplay.scss";
import { User } from '../dtos/user';
import { Hidden } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


function RoleDisplayPage() {
    let loading = async function () {

    }
    const [loadingFunction] = useState(() => {
        return loading
    })
    return (
        <>
            <div className="outer-frame neon">
            </div>
            <div className="inner-frame neon">
                <RoleDisplay />
            </div>

        </>
    );

}

export default RoleDisplayPage;