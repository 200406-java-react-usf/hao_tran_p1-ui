import React, { useState } from 'react';
import "../style/result.scss";
import { User } from '../models/user';
import { Redirect } from 'react-router-dom';

interface ResultProps {
    authUser: User;
}
function Result(props: ResultProps) {
    // @ts-ignore
    const[redirect, setRedirect] = useState("");
    if(props.authUser.role_name == "Admin"){
        setRedirect("/admin");
    }else if(props.authUser.role_name == "Manager"){
        setRedirect("/manager");
    }else if(props.authUser.role_name == "Employee"){
        setRedirect("/employee");
    }

    return (
        <Redirect to={redirect} /> 
    );

}

export default Result;