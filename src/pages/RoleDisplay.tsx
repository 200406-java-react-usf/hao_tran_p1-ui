import React, { useState } from 'react';
import RoleDisplay from '../components/RoleDisplay/RoleDisplayContainer'
import "../style/roleDisplay.scss";



function RoleDisplayPage() {


    return (
        <>
            <div className="outer-frame neon">
            </div>
            <div className="inner-frame neon">
                <RoleDisplay />
            </div>

        </>
    );

}

export default RoleDisplayPage;