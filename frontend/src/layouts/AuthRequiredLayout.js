import React from 'react';
import {Outlet} from "react-router-dom";

const AuthRequiredLayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default AuthRequiredLayout;