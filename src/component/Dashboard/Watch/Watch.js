import React, { useEffect } from 'react'

import './Watch.css';





const Watch = () => {


    useEffect(() => {
        const sec = document.querySelector(".sec");
        const min = document.querySelector(".min");
        const hr = document.querySelector(".hr");
        // console.log("Sec", sec)

        setInterval(function () {
            let time = new Date();
            let secs = time.getSeconds() * 6;
            let mins = time.getMinutes() * 6;
            let hrs = time.getHours() * 30;
            // console.log(time.getSeconds());
            // console.log(time.getMinutes());
            // console.log(time.getHours());

            sec.style.transform = `rotateZ(${secs}deg)`;
            min.style.transform = `rotateZ(${mins}deg)`;
            hr.style.transform = `rotateZ(${hrs + (mins / 12)}deg)`;

        }, 1000);
    }, [])







    return (
        <div className="d-flex justify-content-center">
            <div className="clock">
                <div className="center-nut">

                </div>
                <div className="center-nut2">

                </div>
                <div className="indicators">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="sec-hand">
                    <div className="sec"></div>
                </div>
                <div className="min-hand">
                    <div className="min"></div>
                </div>
                <div className="hr-hand">
                    <div className="hr"></div>
                </div>
            </div>
        </div>
    )
}


export default Watch;
