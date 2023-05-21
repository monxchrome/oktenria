import React from 'react';
import css from './styles/car.module.css'
import {Link} from "react-router-dom";

const Car = ({cars}) => {
    const {photo, brand, model, year, currency, price, city, mileage, _id} = cars

    return (
        <div className={css.Father}>
            <Link to={`/${_id.toString()}`}>
                <div className={css.PhotoDiv}>
                    <img src={photo} className={css.Photo} alt=""/>
                </div>
                <div className={css.Wrap}>
                    <div className={css.BrandDiv}>
                        <h3 className={css.Brand}>{brand} {model} {year}</h3>
                    </div>
                </div>
                <div className={css.Wrap}>
                    <div className={css.PriceDiv}>
                        <h3 className={css.Price}>{currency} {price}</h3>
                        <h5 className={css.Detail}>{mileage} km {city}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Car;