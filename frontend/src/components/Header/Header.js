import React from 'react';
import css from './styles/header.module.css'
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const Header = () => {
    const okten = 'https://owu.com.ua/image/logo/Blue-Big-Bird-Final-Logo.png'

    return (
        <div className={css.Header}>
            <Link to={'/'}>
                <div className={css.LogoDiv}>
                    <img src={okten} className={css.Logo} alt=""/>
                    <h3 className={css.LogoText}>OktenRIA</h3>
                </div>
            </Link>

            <Link to={'/cars/used'}>
                <div>
                    <h4 className={css.Text}>
                        Used autos
                    </h4>
                </div>
            </Link>

            <Link to={'/cars/new'}>
                <div>
                    <h4 className={css.Text}>
                        New autos
                    </h4>
                </div>
            </Link>
            <Button variant="contained" href="/postcar" color="success" className={css.Button}>Add Car</Button>
            <div>
                <Link to={'/login'} className={css.Login}>Log In</Link>
            </div>
        </div>
    );
};

export default Header;