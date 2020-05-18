
import React, { useState } from 'react';
import "../../style/admin.scss";
import { Alert } from '@material-ui/lab';

import { authenticate } from '../../remote/auth-service';
import { User } from '../../dtos/user';
import { Redirect } from 'react-router-dom';
import { searchUseAction } from '../../actions/search-user-action';

interface AdminProps {
    authUser: User;
    searchUser: User;
}

function AdminView(props: AdminProps) {

    // @ts-ignore
    const [UserOnEdit, setUserOnEdit] = useState(null as User);
    // @ts-ignore
    const [NewUser, setNewUser] = useState(null as User);

    const [usernameSearch, setUsernameSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    let updateSearchBar = (e: any) => {
        setUsernameSearch(e.currentTarget.value);
    }
    let search = async (e: any) => {
        searchUseAction("username", usernameSearch);
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
            <div>Search bar
                <input className="form-input"
                    onChange={updateSearchBar}
                    value={username}
                    id="searchInput" type="text"
                    placeholder="Enter Username" />
                <div>search btn</div>
            </div>
            <div>action bar
                <div>add new</div>
                <div>update</div>
                <div>delete</div>
            </div>

            <div>user bar</div>
        </>
    );

}

export default AdminView;