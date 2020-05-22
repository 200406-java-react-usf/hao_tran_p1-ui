
import React, { useState, useEffect } from 'react';
import "../../style/login.scss";
import { Alert } from '@material-ui/lab';

import { authenticate } from '../../remote/auth-service';
import { User } from '../../dtos/user';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../../actions/login-action';

export interface ILoginProps {
    authUser: User;
    errorMessage: string;
    loginAction: (username: string, password: string) => void;
    resetFunction: any;
    transitFunction: any;
}

function LoginForm(props: ILoginProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ready, setReady] = useState(false);

    useEffect(
        () => {
            if (props.authUser) {
                console.log("login");
                props.transitFunction(ready)
            } else {
                console.log("error");
            }
        }, [ready]);

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let login = async (e: any) => {
        props.loginAction(username, password);
        setReady(e);
    }


    return (
        <>
            {errorMessage ? <Redirect to="/error" /> : null}
            <div >
                <form className="form-body neon-inner">
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
                        <span id="submit-button" className="login-botton neon" onClick={login}>LOGIN</span>
                        <span id="reset-button" className="login-botton neon" onClick={props.resetFunction}>CANCEL</span>
                    </div>
                </form>
            </div>
        </>
    );

}

export default LoginForm;