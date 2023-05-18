import React from 'react';
import css from './styles/header.module.css'

const Header = () => {
    const okten = 'https://owu.com.ua/image/logo/Blue-Big-Bird-Final-Logo.png'
    return (
        <div className={css.Header}>
            <div className={css.LogoDiv}>
                <img src={okten} className={css.Logo} alt=""/>
                <h3 className={css.LogoText}>OktenRIA</h3>
            </div>
                <div>
                    <h4 className={css.Text}>
                        Used autos
                    </h4>
                </div>
                <div>
                    <h4 className={css.Text}>
                        New autos
                    </h4>
                </div>
        </div>
    );
};

export default Header;