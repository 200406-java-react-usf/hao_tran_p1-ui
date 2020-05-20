
import React, { useState, useEffect } from 'react';
import "../../style/admin.scss";
import { Alert } from '@material-ui/lab';
import { getUserByUniqueKey } from "../../remote/user-service"

import { addNewUser, updateUser } from '../../remote/user-service';
import { User } from '../../dtos/user';
import { NewUser } from '../../dtos/new-user';
import { Redirect } from 'react-router-dom';
import { searchUseAction } from '../../actions/search-user-action';

interface AdminProps {
    authUser: User;
    searchUser: User;
}

function AdminView(props: AdminProps) {

    const [ers_user_id, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_name, setRole] = useState('');

    //@ts-ignore
    let mockUser = new User("", '', '', '', '', '', '');
    //const [UserOnEdit, setUserOnEdit] = useState(props.searchUser);
    const [UserOnEdit, setUserOnEdit] = useState(mockUser);

    const [usernameSearch, setUsernameSearch] = useState('');

    const [currentAction, setcurrentAction] = useState('');

    const [errorMessage, setErrorMessage] = useState(false);
    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    let updateSearchBar = (e: any) => {
        setUsernameSearch(e.currentTarget.value);
    }
    useEffect(() => {
        if (currentAction != "addnew") {
            updateForm();
        }
    });
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
    }
    let disallowUpdate = () => {
        let un = document.getElementById("username") as HTMLInputElement;
        let pw = document.getElementById("password") as HTMLInputElement;
        let fn = document.getElementById("first_name") as HTMLInputElement;
        let ln = document.getElementById("last_name") as HTMLInputElement;
        let email = document.getElementById("email") as HTMLInputElement;
        let role = document.getElementById("role_name") as HTMLInputElement;

        un.disabled = true;
        pw.disabled = true;
        fn.disabled = true;
        ln.disabled = true;
        email.disabled = true;
        role.disabled = true;
    }
    let updateForm = async () => {
        setUserId(UserOnEdit.ers_user_id.toString());
        setUsername(UserOnEdit.username);
        setPassword(UserOnEdit.password);
        setFirstName(UserOnEdit.first_name);
        setLastName(UserOnEdit.last_name);
        setEmail(UserOnEdit.email);
        setRole(UserOnEdit.role_name);
    }
    let refreshForm = async () => {
        setUserOnEdit(mockUser);

        setUserId("");
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
    }
    let search = async (e: any) => {
        await searchUseAction("username", usernameSearch);
        let searchresult = await getUserByUniqueKey("username", usernameSearch);
        let SearchedUser: User = { ...searchresult.data }
        console.log(SearchedUser);
        setUserOnEdit(SearchedUser);

        console.log(UserOnEdit);

    }
    let selectAction = async (e: any) => {
        let addnewBtn = document.getElementById("addnew") as HTMLDivElement;
        let updateBtn = document.getElementById("update") as HTMLDivElement;
        let deleteBtn = document.getElementById("delete") as HTMLDivElement;

        let newAction = e.currentTarget.id;
        switch (newAction) {
            case "addnew":
                allowUpdate()
                refreshForm()
                setcurrentAction("addnew");
                addnewBtn.classList.add("action-btn-selected");
                updateBtn.classList.remove("action-btn-selected");
                deleteBtn.classList.remove("action-btn-selected");
                break;
            case "update":
                allowUpdate();
                updateForm();
                setcurrentAction("update");
                addnewBtn.classList.remove("action-btn-selected");
                updateBtn.classList.add("action-btn-selected");
                deleteBtn.classList.remove("action-btn-selected");
                break;
            case "delete":
                disallowUpdate();
                updateForm();
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
                let newUser = new User(0, username, password, firstName, lastName, email, role_name);
                let registeredUser = await addNewUser(newUser);
                console.log(registeredUser);
                break;
            case "update":
                let updatedUser = new User(UserOnEdit.ers_user_id, username, password, firstName, lastName, email, role_name);
                await updateUser(updatedUser);
                console.log(updatedUser);
                break;
            case "delete":
                await delete (UserOnEdit.ers_user_id);
                break;
            default:
                console.log("no action selected");
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
                <div className="search-btn neon" onClick={search}>SEARCH</div>
            </div>
            <div className="user-bar">
                <div id="addnew" className="action-btn neon" onClick={selectAction}>ADD NEW USER</div>
                <div id="update" className="action-btn neon" onClick={selectAction}>UPDATE USER</div>
                <div id="delete" className="action-btn neon" onClick={selectAction}>DELETE USER</div>
            </div>

            <div className="user-table neon">
                <div className="table-row">
                    <div>ID</div>
                    <input className="user-input"
                        disabled
                        value={ers_user_id}
                        id="ers_user_id" type="text"
                        placeholder=""
                    />
                </div>
                <div className="table-row">
                    <div>USERNAME</div>
                    <input className="user-input"
                        disabled
                        onChange={updateFormField}
                        value={username}
                        id="username" type="text"
                        placeholder=""
                    /></div>
                <div className="table-row">
                    <div>PASSWORD</div>
                    <input className="user-input"
                        disabled
                        onChange={updateFormField}
                        value={password}
                        id="password" type="text"
                        placeholder=""
                    />
                </div>
                <div className="table-row">
                    <div>FIRST NAME</div>
                    <input className="user-input"
                        disabled
                        onChange={updateFormField}
                        value={firstName}
                        id="first_name" type="text"
                        placeholder=""
                    />
                </div>
                <div className="table-row">
                    <div>LAST NAME</div>
                    <input className="user-input"
                        disabled
                        onChange={updateFormField}
                        value={lastName}
                        id="last_name" type="text"
                        placeholder=""
                    />
                </div>
                <div className="table-row">
                    <div>EMAIL</div>
                    <input className="user-input"
                        disabled
                        onChange={updateFormField}
                        value={email}
                        id="email" type="text"
                        placeholder=""
                    />
                </div>
                <div className="table-row">
                    <div>ROLE</div>
                    <input className="user-input"
                        disabled
                        onChange={updateFormField}
                        value={role_name}
                        id="role_name" type="text"
                        placeholder=""
                    />
                </div>
            </div>
            <div className="user-bar">
                <div id="submit-btn" className="submit-btn neon" onClick={submit}>submit</div>
                <div id="cancel-btn" className="submit-btn neon">cancel</div>
            </div>
        </>
    );

}

export default AdminView;