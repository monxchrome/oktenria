import React from 'react';
import { NavLink } from 'react-router-dom';

const ClearURLNavLink = ({ to, children }) => {
    const handleClick = () => {
        window.history.replaceState(null, '', to);
    };

    return (
        <NavLink to={to} onClick={handleClick}>
            {children}
        </NavLink>
    );
};

export default ClearURLNavLink;