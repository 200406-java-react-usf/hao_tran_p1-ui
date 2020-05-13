window.onload = function() {
    let animationCheckBox1 = true;
    let animationCheckBox2 = true;
    const timeout = function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
        // async function rotateBox() {
        //     const ele = document.getElementById("cube"),
        //         K = 5;

    //     let drag = false,
    //         x0 = null,
    //         y0 = null;

    //     function getE(ev) {
    //         return ev;
    //     };

    //     function lock(ev) {
    //         let e = getE(ev);
    //         drag = true;
    //         x0 = e.clientX;
    //         y0 = e.clientY;
    //     };

    //     function rot(ev) {
    //         if (drag) {
    //             let e = getE(ev),
    //                 x = e.clientX,
    //                 y = e.clientY,
    //                 dx = x - x0,
    //                 dy = y - y0,
    //                 d = Math.hypot(dx, dy);

    //             if (d) {
    //                 let i = +(-dy / d),
    //                     j = +(dx / d),
    //                     a = +(K * d),
    //                     c = `rotate3d(${[i, j, 0, a]}deg)` +
    //                     getComputedStyle(ele).transform
    //                     .replace('none', '');

    //                 ele.style.transform = c;

    //                 x0 = x;
    //                 y0 = y;
    //             }
    //         }
    //     };

    //     function rel(ev) {
    //         if (drag) {
    //             drag = false;
    //             x0 = y0 = null;
    //         }
    //     };

    //     addEventListener('mousedown', lock, false);
    //     addEventListener('mousemove', rot, false);
    //     addEventListener('mouseup', rel, false);
    // }
    async function ready() {
        document.getElementById("viewport-cube").addEventListener("click", async() => {
            let cube = document.getElementById("cube");

            cube.classList.add("pause");
            let currentPos1 = getComputedStyle(cube).getPropertyValue("transform");
            cube.classList.remove("cube-ani-1");
            cube.style.transform = currentPos1;
            cube.style.transition = "all 500ms";
            await timeout(50);
            cube.classList.add("cube-ready");
            await timeout(250);
            let cube2 = document.getElementById("cube-inner");
            cube2.classList.add("pause");
            let currentPos2 = getComputedStyle(cube2).getPropertyValue("transform");
            cube2.classList.remove("cube-ani-2");
            cube2.style.transform = currentPos2;
            cube2.style.transition = "all 1000ms";
            await timeout(50);
            cube2.classList.add("cube-ready2");


        })
    }
    ready();
}