
import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';

import { User } from '../../dtos/user';
import { Redirect } from 'react-router-dom';
import AdminView from '../AdminView/AdminViewContainer'

interface IRoleProps {
    authUser: User;
}

function RoleDisplay(props: IRoleProps) {
    //const [roleName] = useState(props.authUser.role_name);
    const [roleName] = useState("admin");

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    let randomizeTextAni = async (text: string, id: string) => {
        let mask = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let target = text;
        let speed = 12;
        let increment = 10;
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
        if (roleName == "admin"){
            roleDisplay = "ADMINISTRATOR"
        }else{
            roleDisplay = roleName.toUpperCase()
        }
        timeout(500);
        randomizeTextAni(roleDisplay, "loadingScreen-role");
    }
    let showAccess = async () => {
        let loadingScreen = document.getElementById("loadingScreen") as HTMLDivElement;
        loadingScreen.classList.add("disabled");
        let roleInterface = document.getElementById(roleName+"Screen") as HTMLDivElement;
        roleInterface.classList.remove("disabled");
    }
    renderNewRole()
    return (
        <>
            <div id="loadingScreen" className="screen">
                <div className="loadingScreen-title" onClick={showAccess}>------------WELCOME------------</div>
                <div id="loadingScreen-role" className="loadingScreen-role" onClick={showAccess}></div>
            </div>
            <div id="adminScreen" className="screen disabled">
                add new user
                update user
                delete user
                <AdminView/>
            </div>
            <div id="managerScreen" className="screen disabled">
                manager
            </div>
            <div id="employeeScreen" className="screen disabled">
                employee
            </div>
        </>
    );

}

export default RoleDisplay;