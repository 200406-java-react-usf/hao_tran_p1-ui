
import React, { useState } from 'react';
import "../../style/login.scss";
import { Alert } from '@material-ui/lab';

import { authenticate } from '../../remote/auth-service';
import { User } from '../../models/user';
import { Redirect } from 'react-router-dom';

interface LoginProps {
    authUser: User;
    setAuthUser: (user: User) => void;
    resetFunction: any;
}

function LoginForm(props: LoginProps) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [errorMessage, setErrorMessage] = useState('Test message');

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let login = async (e: any) => {
        // let authUser = await authenticate(username, password);
        // props.setAuthUser(authUser);
    }

    let reset = async (e: any) => {
        window.location.reload();
    }

    return (
        <>
            <div >
                <form className="form-body">
                    <div className="form-title">USERNAME</div>
                    <input className="form-input"
                        onChange={updateUsername}
                        value={username}
                        id="username" type="text"
                        placeholder="Enter your username" />

                    <div className="form-title">PASSWORD</div>
                    <input className="form-input"
                        onChange={updatePassword}
                        value={password}
                        id="password" type="password"
                        placeholder="Enter your password" />
                    <div className="button-container form-title">
                        <span id="submit-button" className="login-botton" onClick={login}>LOGIN</span>
                        <span id="reset-button" className="login-botton" onClick={props.resetFunction}>CANCEL</span>
                    </div>
                </form>
            </div>
        </>
    );

}

export default LoginForm;