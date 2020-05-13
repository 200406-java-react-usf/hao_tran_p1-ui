import React, { useState } from 'react';
import "../style/main.scss";
import { LoginForm } from '../components/LoginForm/LoginForm'
// interface ILoginProps {
//     authUser: User;
//     setAuthUser: (user: User) => void;
// }

function Entrance() {

    const [readyState, setReadyState] = useState(false);
    const [password, setPassword] = useState('');

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    let stopAni = async (e: any) => {

        let cube = document.getElementById("cube") as HTMLDivElement;
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

        setReadyState(true);
    }
    let loadAdmin = async (e: any) => {
        if (readyState) {
            let cube = document.getElementById("cube") as HTMLDivElement;
            cube.classList.remove("cube-ready");
            cube.classList.add("displayAdmin");
        }
    }
    let loadManager = async (e: any) => {
        if (readyState) {
            let cube = document.getElementById("cube") as HTMLDivElement;
            cube.classList.remove("cube-ready");
            cube.classList.add("displayManager");
        }
    }
    let loadEmployee = async (e: any) => {
        if (readyState) {
            let cube = document.getElementById("cube") as HTMLDivElement;
            cube.classList.remove("cube-ready");
            cube.classList.add("displayEmployee");
        }
    }
    return (
        <>
            <div className="wrapper">
                <div id="viewport-cube" className="viewport" onClick={stopAni}>
                    <div id="cube-inner" className="cube-inner  cube-ani-2">
                        <div id="cube-face-1-a" className="cube-face-inner">
                            1-a
                            </div>
                        <div id="cube-face-2-a" className="cube-face-inner">
                            2-a
                            </div>
                        <div id="cube-face-3-a" className="cube-face-inner">
                            3-a
                            </div>
                        <div id="cube-face-4-a" className="cube-face-inner">
                            4-a
                            </div>
                        <div id="cube-face-5-a" className="cube-face-inner">
                            5-a
                            </div>
                        <div id="cube-face-6-a" className="cube-face-inner">
                            6-a
                        </div>
                    </div>
                    <div id="cube" className="cube cube-ani-1">
                        <div id="cube-face-1" className="cube-face" onClick={loadAdmin}>
                        <LoginForm />
                </div>
                        <div id="cube-face-2" className="cube-face" onClick={loadManager}>
                        <LoginForm />
                </div>
                        <div id="cube-face-3" className="cube-face">
                            3
                </div>
                        <div id="cube-face-4" className="cube-face">
                            4
                </div>
                        <div id="cube-face-5" className="cube-face" onClick={loadEmployee}>
                        <LoginForm />
                </div>
                        <div id="cube-face-6" className="cube-face">
                            6
                </div>
                    </div>

                </div>
            </div>
        </>
    );

}

export default Entrance;