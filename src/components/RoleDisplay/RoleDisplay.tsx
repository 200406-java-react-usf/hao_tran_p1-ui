
import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';

import { User } from '../../dtos/user';
import { Redirect } from 'react-router-dom';
import AdminView from '../AdminView/AdminViewContainer'
import ManagerView from '../ManagerView/ManagerViewContainer'
import EmployeeView from '../EmployeeView/EmployeeViewContainer'

interface IRoleProps {
    authUser: User;
    logoutAction: ()=>void;
}

function RoleDisplay(props: IRoleProps) {
    const [roleName] = useState(props.authUser.role_name);

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    let randomizeTextAni = async (text: string, id: string) => {
        let mask = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let target = text;
        let speed = 20;
        let increment = 15;
        let frameOrder = 0;
        let stri = 0;
        let block = "";
        let fixed = "";
        (function rustle(i) {
            setTimeout(function () {
                if (--i) { rustle(i); }
                nextFrame(i);
                frameOrder++;
            }, speed);

        })(target.length * increment + 1);
        let nextFrame = function (pos: number) {
            for (let i = 0; i < target.length - stri; i++) {
                let num = Math.floor(mask.length * Math.random());
                let letter = mask.charAt(num);
                block = block + letter;
            }
            if (frameOrder == (increment - 1)) {
                stri++;
            }
            if (frameOrder == increment) {
                fixed = fixed + target.charAt(stri - 1);
                frameOrder = 0;
            }
            let display = document.getElementById(id) as HTMLDivElement;
            display.innerHTML = fixed + block;
            block = "";
        }
    }
    let renderNewRole = async () => {
        let roleDisplay: string;
        if (roleName == "admin") {
            roleDisplay = "ADMINISTRATOR"
        } else {
            roleDisplay = roleName.toUpperCase()
        }
        timeout(500);
        randomizeTextAni(roleDisplay, "loadingScreen-role");
    }
    let showAccess = async () => {
        let loadingScreen = document.getElementById("loadingScreen") as HTMLDivElement;
        loadingScreen.classList.add("disabled");
        let roleInterface = document.getElementById(roleName + "Screen") as HTMLDivElement;
        roleInterface.classList.remove("disabled");
    }
    if (roleName) {
        renderNewRole()
    }
    return (
        <>
        {!props.authUser? <Redirect to="/" />:null }
            <div id="loadingScreen" className="screen glitch-container">
                <div className="loadingScreen-title" onClick={showAccess}>----   WELCOME   ----</div>
                <div id="loadingScreen-role" className="loadingScreen-role" onClick={showAccess}></div>
            </div>
            <div id="adminScreen" className="screen disabled">
                {roleName == "admin" ? <AdminView /> : null}
            </div>
            <div id="managerScreen" className="screen disabled">
                {roleName == "manager" ? <ManagerView /> : null}
            </div>
            <div id="employeeScreen" className="screen disabled">
                {roleName == "employee" ? <EmployeeView /> : null}
            </div>
        </>
    );

}

export default RoleDisplay;