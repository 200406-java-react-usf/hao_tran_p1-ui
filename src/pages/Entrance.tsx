import React, { useState } from 'react';
import "../style/entrance.scss";
import LoginForm from '../components/LoginForm/LoginFormContainer'
import { User } from '../dtos/user';
import { Hidden } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

function Entrance() {
    
    const [readyState, setReadyState] = useState(false);
    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    let stopAni = async (e: any) => {
        let cube = document.getElementById("cube") as HTMLDivElement;
        let viewport = document.getElementById("viewport-cube") as HTMLDivElement;

        let face1 = document.getElementById("face1") as HTMLDivElement;
        let face2 = document.getElementById("face2") as HTMLDivElement;
        let face6 = document.getElementById("face6") as HTMLDivElement;
        await timeout(500);
        cube.classList.add("pause");
        let currentPos1 = getComputedStyle(cube).getPropertyValue("transform");
        cube.classList.remove("cube-ani-1");
        cube.style.transform = currentPos1;
        cube.style.transition = "all 500ms";
        await timeout(50);
        cube.classList.add("cube-ready");
        await timeout(250);
        let cube2 = document.getElementById("cube-inner") as HTMLDivElement;
        cube2.classList.add("pause");
        let currentPos2 = getComputedStyle(cube2).getPropertyValue("transform");
        cube2.classList.remove("cube-ani-2");
        cube2.style.transform = currentPos2;
        cube2.style.transition = "all 500ms";
        await timeout(50);
        cube2.classList.add("cube-ready2");

        face1.classList.remove('hidden');
        face2.classList.remove('hidden');
        face6.classList.remove('hidden');
        await timeout(50);
        setReadyState(true);
    }
    let loadAdmin = async (e: any) => {
        let cube = document.getElementById("cube") as HTMLDivElement;
        let face1 = document.getElementById("face1") as HTMLDivElement;
        if (readyState == true) {
            cube.classList.remove("cube-ready");
            cube.classList.add("displayAdmin");
            await timeout(500);
            let login = face1.nextSibling as HTMLDivElement;
            login.classList.remove('hidden');
        }
    }
    let loadManager = async (e: any) => {
        let cube = document.getElementById("cube") as HTMLDivElement;
        let face2 = document.getElementById("face2") as HTMLDivElement;
        if (readyState) {
            cube.classList.remove("cube-ready");
            cube.classList.add("displayManager");
            await timeout(500);
            let login = face2.nextSibling as HTMLDivElement;
            login.classList.remove('hidden');
        }
    }
    let loadEmployee = async (e: any) => {
        let cube = document.getElementById("cube") as HTMLDivElement;
        let face6 = document.getElementById("face6") as HTMLDivElement;
        if (readyState) {
            cube.classList.remove("cube-ready");
            cube.classList.add("displayEmployee");
            await timeout(500);
            let login = face6.nextSibling as HTMLDivElement;
            login.classList.remove('hidden');
        }
    }
    let reset = async (e: any) => {
        e.stopPropagation();
        let cube = document.getElementById("cube") as HTMLDivElement;
        let face1 = document.getElementById("face1") as HTMLDivElement;
        let face2 = document.getElementById("face2") as HTMLDivElement;
        let face6 = document.getElementById("face6") as HTMLDivElement;
        let login1 = face1.nextSibling as HTMLDivElement;
        login1.classList.add('hidden');
        let login2 = face2.nextSibling as HTMLDivElement;
        login2.classList.add('hidden');
        let login6 = face6.nextSibling as HTMLDivElement;
        login6.classList.add('hidden');
        await timeout(500);
        cube.classList.add("cube-ready");
        cube.classList.remove("displayAdmin");
        cube.classList.remove("displayManager");
        cube.classList.remove("displayEmployee");
    }
    const [resetFunction] = useState(() => {
        return reset
    })
    const [redirect, setRedirect] = useState(false);
    const closeMenu = async (e: any) => {
        e.stopPropagation();
        let cube = document.getElementById("cube") as HTMLDivElement;
        let cube2 = document.getElementById("cube-inner") as HTMLDivElement;
        let transit = document.getElementById("transit") as HTMLDivElement;
        let viewport = document.getElementById("viewport-cube") as HTMLDivElement;

        cube.classList.add("hidden");
        cube2.classList.add("hidden");
        transit.classList.remove("transit-wrapper-inactive");
        transit.classList.remove("hidden");
        transit.classList.add("transit-wrapper-active");
 
        await timeout(500);
        transit.classList.remove("transit-wrapper-active");
        transit.classList.add("transit-wrapper-final1");
        viewport.classList.add("viewport-square");
        await timeout(500);
        viewport.classList.add("viewport-line");
        await timeout(500);
        transit.classList.remove("transit-wrapper-final1");
        transit.classList.add("transit-wrapper-final2");
        await timeout(500);
        transit.classList.remove("transit-wrapper-final2");
        transit.classList.add("transit-wrapper-line");

        await timeout(750);

        transit.classList.remove("transit-wrapper-line");
        transit.classList.add("transit-wrapper-final3");
        viewport.classList.add("viewport-final");
        await timeout (1000);
        setRedirect(true);
    }
    const [transitFunction] = useState(() => {
        return closeMenu
    })
    return (
        <>
        {redirect ? <Redirect to = "/roledisplay"/> : null}
            <div className="wrapper">
                <div id="transit" className="transit-wrapper-inactive  neon"></div>
                <div id="viewport-cube" className="viewport neon" onClick={stopAni}>
                    <div id="cube-inner" className="cube-inner  cube-ani-2">
                        <div id="cube-face-1-a" className="cube-face-inner neon">

                            </div>
                        <div id="cube-face-2-a" className="cube-face-inner neon">

                            </div>
                        <div id="cube-face-3-a" className="cube-face-inner neon">

                            </div>
                        <div id="cube-face-4-a" className="cube-face-inner neon">

                            </div>
                        <div id="cube-face-5-a" className="cube-face-inner neon">
                            </div>
                        <div id="cube-face-6-a" className="cube-face-inner neon">
                        </div>
                    </div>
                    <div id="cube" className="cube cube-ani-1">
                        <div id="cube-face-1" className="cube-face" onClick={loadAdmin}>
                            <div id='face1' className="cube-title hidden">ADMIN</div>
                            <div className="loginWrapper-ready hidden">
                                <LoginForm resetFunction={resetFunction} transitFunction={transitFunction} />
                            </div>
                        </div>
                        <div id="cube-face-2" className="cube-face neon" onClick={loadManager}>
                            <div id='face2' className="cube-title hidden">MANAGER</div>
                            <div className="loginWrapper-ready hidden">
                                <LoginForm resetFunction={resetFunction} transitFunction={transitFunction} />
                            </div>
                        </div>
                        <div id="cube-face-3" className="cube-face neon">

                        </div>
                        <div id="cube-face-4" className="cube-face neon">

                        </div>
                        <div id="cube-face-5" className="cube-face neon" onClick={loadEmployee}>
                            <div id='face6' className="cube-title special-employee hidden">EMPLOYEE</div>
                            <div className="loginWrapper-ready hidden  neon">
                                <LoginForm resetFunction={resetFunction} transitFunction={transitFunction} />
                            </div>
                        </div>
                        <div id="cube-face-6" className="cube-face neon">

                        </div>
                    </div>

                </div>

            </div>
        </>
    );

}

export default Entrance;