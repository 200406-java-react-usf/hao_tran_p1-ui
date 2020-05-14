
import React, { useState } from 'react';
import "../../style/login.scss";
import { Alert } from '@material-ui/lab';

import { authenticate } from '../../remote/auth-service';
import { User } from '../../models/user';
import { Redirect } from 'react-router-dom';

interface AdminProps {
    authUser: User;
    setAuthUser: (user: User) => void;
    resetFunction: any;
}

function LoginForm(props: AdminProps) {

    // @ts-ignore
    const [UserOnEdit, setUserOnEdit] = useState(null as User);
    // @ts-ignore
    const [NewUser, setNewUser] = useState(null as User);

    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    let updateSearchBar = (e: any) => {
        setUsername(e.currentTarget.value);
    }
    let search = async (e: any) => {

        // await getUserByUniqueKey({username: username})
        //     .then(response => {
        //         console.log(response)
        //         if (response.status === 200) {
        //             // update App.js state
        //             setUserOnEdit(response);
        //             setNewUser(UserOnEdit);
        //         }
        //     }).catch(error => {
        //         setErrorMessage(true);
        //     })
    }

    let allowUpdate = (e: any) => {
        let fn = document.getElementById("first_name") as HTMLInputElement;
        let ln = document.getElementById("last_name") as HTMLInputElement;
        let email = document.getElementById("email") as HTMLInputElement;
        let role = document.getElementById("role_name") as HTMLInputElement;

        fn.disabled = false;
        ln.disabled = false;
        email.disabled = false;
        role.disabled = false;

        let updateBTN = document.getElementById("update") as HTMLDivElement;
        let backBTN = document.getElementById("submit") as HTMLDivElement;

        updateBTN.style.display = "none";
        backBTN.style.display = "block";
    }
    
    let updateUserOnEdit = async () => {
        let updatedUser = UserOnEdit;
        let fn = document.getElementById("first_name") as HTMLInputElement;
        updatedUser.first_name = fn.value;
        let ln = document.getElementById("last_name") as HTMLInputElement;
        updatedUser.last_name = ln.value;
        let email = document.getElementById("email") as HTMLInputElement;
        updatedUser.email = email.value;
        let role = document.getElementById("role_name") as HTMLInputElement;
        updatedUser.role_name = role.value;
        setNewUser(updatedUser);
    }



    let update = async (e: any) => {
        disallowUpdate();
        setUserOnEdit(NewUser);
        // await updateUser(UserOnEdit)
    }
    let disallowUpdate = () => {
        let fn = document.getElementById("first_name") as HTMLInputElement;
        let ln = document.getElementById("last_name") as HTMLInputElement;
        let email = document.getElementById("email") as HTMLInputElement;
        let role = document.getElementById("role_name") as HTMLInputElement;

        fn.disabled = true;
        ln.disabled = true;
        email.disabled = true;
        role.disabled = true;

        let updateBTN = document.getElementById("update") as HTMLDivElement;
        let backBTN = document.getElementById("update") as HTMLDivElement;

        updateBTN.style.display = "block";
        backBTN.style.display = "none";
    }



    let addUser = (e: any) => {


    }

    return (
        <>
            <div >
                <div className="search-bar">
                    <div className="form-title">Search User</div>
                    <input className="form-input"
                        onChange={updateSearchBar}
                        value={username}
                        id="username" type="text"
                        placeholder="Enter username" />
                    <div className="searchBtn" onClick={search}>Search</div>
                </div>
                <div className="user-wrapper">
                    <div id="line1" className="line">
                        <input className="form-input"
                            disabled
                            onChange={updateUserOnEdit}
                            value={NewUser.first_name}
                            id="first_name" type="text"
                        />
                        <input className="form-input"
                            disabled
                            onChange={updateUserOnEdit}
                            value={NewUser.last_name}
                            id="last_name" type="text"
                        />
                    </div>
                    <div className="line">EMAIL</div>
                    <div id="email" className="line">{NewUser.email}</div>
                    <div className="line">ROLE</div>
                    <div id="role_name" className="line">{NewUser.role_name}</div>
                </div>
                <div className="action-bar">
                    <div id="update" className="action-button" onClick={allowUpdate}>UPDATE</div>
                    <div id="submit" className="action-button" onClick={update}>SUBMIT</div>
                    <div id="add" className="action-button" onClick={addUser}>ADD</div>
                    <div id="delete" className="action-button">DELETE</div>
                </div>

            </div>
        </>
    );

}

export default LoginForm;