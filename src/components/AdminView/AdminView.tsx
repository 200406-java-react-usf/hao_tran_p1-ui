
import React, { useState, useEffect } from 'react';
import "../../style/admin.scss";
import { getUserByUniqueKey } from "../../remote/user-service"

import { addNewUser, updateUser, deleteUserById } from '../../remote/user-service';
import { User } from '../../dtos/user';
import { Redirect } from 'react-router-dom';
import { logoutAction } from '../../actions/logout-action';

export interface AdminProps {
    authUser: User;
    errorMessage: string;
    logoutAction: () => void;
}

function AdminView(props: AdminProps) {

    const [ers_user_id, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [userpassword, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_name, setRole] = useState('');

    //@ts-ignore
    let mockUser = new User("", '', '', '', '', '', '');

    // not used
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
        if (!currentAction) {
            updateForm();
        }
    });
    let allowUpdate = () => {
        let un = document.getElementById("username") as HTMLInputElement;
        let pw = document.getElementById("userpassword") as HTMLInputElement;
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
        let pw = document.getElementById("userpassword") as HTMLInputElement;
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
        setPassword(UserOnEdit.userpassword);
        setFirstName(UserOnEdit.first_name);
        setLastName(UserOnEdit.last_name);
        setEmail(UserOnEdit.email);
        setRole(UserOnEdit.role_name);
    }
    let refreshForm = async () => {
        let addnewBtn = document.getElementById("addnew") as HTMLDivElement;
        let updateBtn = document.getElementById("update") as HTMLDivElement;
        let deleteBtn = document.getElementById("delete") as HTMLDivElement;
        setUserOnEdit(mockUser);

        setUserId("");
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
        setUsernameSearch("");

        addnewBtn.classList.remove("action-btn-selected");
        updateBtn.classList.remove("action-btn-selected");
        deleteBtn.classList.remove("action-btn-selected");
    }
    let search = async (e: any) => {
        let searchresult = await getUserByUniqueKey("username", usernameSearch);
        let SearchedUser: User = { ...searchresult.data }
        setUserOnEdit(SearchedUser);
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

    let neonAni = async (e: any) => {
        let target = e.currentTarget.parentElement
        target.classList.add("neon-minor");
        await timeout(500);
        target.classList.remove("neon-minor");
    }
    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'username':
                neonAni(e);
                setUsername(e.currentTarget.value);
                break;
            case 'userpassword':
                neonAni(e);
                setPassword(e.currentTarget.value);
                break;
            case 'first_name':
                neonAni(e);
                setFirstName(e.currentTarget.value);
                break;
            case 'last_name':
                neonAni(e);
                setLastName(e.currentTarget.value);
                break;
            case 'email':
                neonAni(e);
                setEmail(e.currentTarget.value);
                break;
            case 'role_name':
                neonAni(e);
                setRole(e.currentTarget.value);
                break;
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}`);
        }
    }
    let submit = async (e: any) => {
        switch (currentAction) {
            case "addnew":
                let newUser = new User(0, username, userpassword, firstName, lastName, email, role_name);
                await addNewUser(newUser);
                refreshForm();
                setcurrentAction("");
                break;
            case "update":
                let updatedUser = new User(UserOnEdit.ers_user_id, username, userpassword, firstName, lastName, email, role_name);
                await updateUser(updatedUser);
                refreshForm();
                setcurrentAction("");
                break;
            case "delete":
                await deleteUserById(UserOnEdit.ers_user_id);
                refreshForm();
                setcurrentAction("");
                break;
            default:
                console.log("no action selected");

        }
    }

    const [redirect, setRedirect] = useState(false);

    let returnHome = async function () {
        props.logoutAction();
        localStorage.clear();
        setRedirect(true);
    }
    return (
        <>
            {redirect ? <Redirect to="/" /> : null}
            <div>
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
                        <div className="unselectable">ID</div>
                        <input className="user-input"
                            disabled
                            value={ers_user_id}
                            id="ers_user_id" type="text"
                            placeholder=""
                        />
                    </div>
                    <div className="table-row">
                        <div className="unselectable">USERNAME</div>
                        <input className="user-input"
                            disabled
                            onChange={updateFormField}
                            value={username}
                            id="username" type="text"
                            placeholder=""
                        /></div>
                    <div className="table-row">
                        <div className="unselectable">PASSWORD</div>
                        <input className="user-input"
                            disabled
                            onChange={updateFormField}
                            value={userpassword}
                            id="userpassword" type="text"
                            placeholder=""
                        />
                    </div>
                    <div className="table-row">
                        <div className="unselectable">FIRST NAME</div>
                        <input className="user-input"
                            disabled
                            onChange={updateFormField}
                            value={firstName}
                            id="first_name" type="text"
                            placeholder=""
                        />
                    </div>
                    <div className="table-row">
                        <div className="unselectable">LAST NAME</div>
                        <input className="user-input"
                            disabled
                            onChange={updateFormField}
                            value={lastName}
                            id="last_name" type="text"
                            placeholder=""
                        />
                    </div>
                    <div className="table-row">
                        <div className="unselectable">EMAIL</div>
                        <input className="user-input"
                            disabled
                            onChange={updateFormField}
                            value={email}
                            id="email" type="text"
                            placeholder=""
                        />
                    </div>
                    <div className="table-row">
                        <div className="unselectable">ROLE</div>
                        <select className="reimb-input-dropdown" id="role_name" value={role_name} onChange={updateFormField}>
                            <option value="admin">ADMIN</option>
                            <option value="manager">MANAGER</option>
                            <option value="user">USER</option>
                        </select>
                    </div>
                </div>
                <div className="user-bar">
                    <div id="submit-btn" className="submit-btn neon" onClick={submit}>SUBMIT</div>
                    <div id="cancel-btn" className="submit-btn neon" onClick={refreshForm}>CANCEL</div>
                    <div id="cancel-btn" className="submit-btn neon" onClick={returnHome}>HOME</div>
                </div>
            </div>
            <div className="scanlines"></div>

        </>
    );

}

export default AdminView;