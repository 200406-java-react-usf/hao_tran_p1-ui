import React, { useState } from 'react';
import "../style/admin.scss";
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';

interface ResultProps {
    authUser: User;
}
function Result(props: ResultProps) {
    // @ts-ignore
    const[redirect, setRedirect] = useState("");

    let loadAdmin = async (e: any) => {

    }

    return (
        <Redirect to={redirect} /> 
    );

}

export default Result;