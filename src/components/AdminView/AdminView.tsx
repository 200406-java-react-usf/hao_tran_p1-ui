
import React, { useState } from 'react';
import "../../style/admin.scss";
import { Alert } from '@material-ui/lab';

import { addNewUser } from '../../remote/user-service';
import { User } from '../../dtos/user';
import { NewUser } from '../../dtos/new-user';
import { Redirect } from 'react-router-dom';
import { searchUseAction } from '../../actions/search-user-action';

interface AdminProps {
    authUser: User;
    searchUser: User;
}

function AdminView(props: AdminProps) {

    //const [UserOnEdit, setUserOnEdit] = useState(props.searchUser);

    //@ts-ignore
    let mockUser = new User("", '', '', '', '', '', '');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_name, setRole] = useState('');

    const [UserOnEdit, setUserOnEdit] = useState(mockUser);

    const [usernameSearch, setUsernameSearch] = useState('');

    const [currentAction, setcurrentAction] = useState('');

    const [errorMessage, setErrorMessage] = useState(false);

    let updateSearchBar = (e: any) => {
        setUsernameSearch(e.currentTarget.value);
    }
    let search = async (e: any) => {
        await searchUseAction("username", usernameSearch);
        setUserOnEdit(props.searchUser);
    }
    let allowUpdate = () => {
        let un = document.getElementById("username") as HTMLInputElement;
        let pw = document.getElementById("password") as HTMLInputElement;
        let fn = document.getElementById("first_name") as HTMLInputElement;
        let ln = document.getElementById("last_name") as HTMLInputElement;
        let email = document.getElementById("email") as HTMLInputElement;
        let role = document.getElementById("role_name") as HTMLInputElement;

        un.removeAttribute('disabled');
        pw.removeAttribute('disabled');
        fn.removeAttribute('disabled');
        ln.removeAttribute('disabled');
        email.removeAttribute('disabled');
        role.removeAttribute('disabled');

        let updateBTN = document.getElementById("update") as HTMLDivElement;
    }
    let selectAction = async (e: any) => {
        let addnewBtn = document.getElementById("addNew") as HTMLDivElement;
        let updateBtn = document.getElementById("update") as HTMLDivElement;
        let deleteBtn = document.getElementById("delete") as HTMLDivElement;

        let newAction = e.currentTarget.id;
        switch (newAction) {
            case "addnew":
                allowUpdate()
                //@ts-ignore
                let newUser = new User("", "", "", "", "", "", "");
                setUserOnEdit(newUser);
                setcurrentAction("addnew");
                addnewBtn.classList.add("action-btn-selected");
                updateBtn.classList.remove("action-btn-selected");
                deleteBtn.classList.remove("action-btn-selected");
                break;
            case "update":
                allowUpdate();
                setcurrentAction("update");
                addnewBtn.classList.remove("action-btn-selected");
                updateBtn.classList.add("action-btn-selected");
                deleteBtn.classList.remove("action-btn-selected");
                break;
            case "delete":
                setcurrentAction("delete");
                addnewBtn.classList.remove("action-btn-selected");
                updateBtn.classList.remove("action-btn-selected");
                deleteBtn.classList.add("action-btn-selected");
                break;
        }
    }

    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'username':
                setUsername(e.currentTarget.value);
                break;
            case 'password':
                setPassword(e.currentTarget.value);
                break;
            case 'first_name':
                setFirstName(e.currentTarget.value);
                break;
            case 'last_name':
                setLastName(e.currentTarget.value);
                break;
            case 'email':
                setEmail(e.currentTarget.value);
                break;
            case 'role_name':
                setRole(e.currentTarget.value);
                break;
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}`);
        }
    }
    let submit = async (e: any) => {
        switch (currentAction) {
            case "addNew":
                let mockUser = new User(0, username, password, firstName, lastName, email, role_name);
                let registeredEmployee = await addNewUser(mockUser);
                console.log(registeredEmployee);
                break;
            case "update":
                break;
            case "delete":
                break;
        }
    }

    return (
        <>
            <div className="user-bar">
                <div className="bar-text">USERNAME: </div>
                <input className="user-input"
                    onChange={updateSearchBar}
                    value={usernameSearch}
                    id="searchInput" type="text"
                    placeholder="" />
                <div className="search-btn neon" onClick={search}>search btn</div>
            </div>
            <div className="user-bar">
                <div id="addnew" className="action-btn neon" onClick={selectAction}>ADD NEW USER</div>
                <div id="update" className="action-btn neon" onClick={selectAction}>UPDATE USER</div>
                <div id="delete" className="action-btn neon" onClick={selectAction}>DELETE USER</div>
            </div>

            <div className="user-table">
                <input className="user-input"
                    disabled
                    value={UserOnEdit.ers_user_id}
                    id="ers_user_id" type="text"
                    placeholder=""
                />
                <input className="user-input"
                    disabled
                    onChange={updateFormField}
                    value={username}
                    id="username" type="text"
                    placeholder=""
                />
                <input className="user-input"
                    disabled
                    onChange={updateFormField}
                    value={password}
                    id="password" type="text"
                    placeholder=""
                />
                <input className="user-input"
                    disabled
                    onChange={updateFormField}
                    value={firstName}
                    id="first_name" type="text"
                    placeholder=""
                />
                <input className="user-input"
                    disabled
                    onChange={updateFormField}
                    value={lastName}
                    id="last_name" type="text"
                    placeholder=""
                />
                <input className="user-input"
                    disabled
                    onChange={updateFormField}
                    value={email}
                    id="email" type="text"
                    placeholder=""
                />
                <input className="user-input"
                    disabled
                    onChange={updateFormField}
                    value={role_name}
                    id="role_name" type="text"
                    placeholder=""
                />
            </div>
            <div className="user-bar">submit cancel bar</div>
        </>
    );

}

export default AdminView;