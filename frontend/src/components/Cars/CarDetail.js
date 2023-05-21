import React, {useEffect, useState} from 'react';
import css from './styles/cardetail.module.css'
import {carsService} from "../../services/carsService";
import Car from "./Car";

const CarDetail = ({car}) => {
    const {
        photo, brand, model, price, currency, year, fuel_consumption_per_100_km, number_of_doors, number_of_seats,
        fuel, color, state, city, country, type, countryCar, bodyType, transportType, mileage
    } = car
    const [cars, setCars] = useState([]);

    useEffect(() => {
        carsService.getAll().then(({data}) => setCars(data.data));
    }, [setCars])

    return (
        <div className={css.Father}>
            <div className={css.Column1}>
                <div className={css.BrandDiv}>
                    <h2 className={css.Brand}>
                        {brand} {model} {year}
                    </h2>
                </div>
                <div className={css.PriceDiv}>
                    <h3 className={css.Price}>
                        {currency} {price}
                    </h3>
                </div>
                <div className={css.FuelDiv}>
                    <p className={css.Fuel}>
                        Fuel per 100 km: {fuel_consumption_per_100_km}
                    </p>
                </div>
            </div>
            <div className={css.Column2}>
                <div className={css.PhotoDiv}>
                    <img src={photo} className={css.Photo} alt=""/>
                </div>
                <div>
                    <h4 className={css.Brand2}>
                        {brand} {model} {year}
                    </h4>
                </div>
                <div>
                    <p className={css.NOD}>
                        Number of doors {number_of_doors} Seats - {number_of_seats}
                    </p>
                </div>
                <div className={css.Details}>
                    <div className={css.TextDiv}>
                        <div>
                            <p className={css.Text}>
                                Fuel: {fuel}
                            </p>
                        </div>
                        <div>
                            <p className={css.Text}>
                                Color: {color}
                            </p>
                        </div>
                        <div>
                            <p className={css.Text}>
                                State: {state}
                            </p>
                        </div>
                        <div>
                            <p className={css.Text}>
                                City: {city}
                            </p>
                        </div>
                        <div>
                            <p className={css.Text}>
                                Country: {country}
                            </p>
                        </div>
                    </div>
                    <div className={css.TextDiv2}>
                        <div>
                            <p className={css.Text}>
                                Type: {type}
                            </p>
                        </div>
                        <div>
                            <p className={css.Text}>
                                Country Car: {countryCar}
                            </p>
                        </div>
                        <div>
                            <p className={css.Text}>
                                Body Type: {bodyType}
                            </p>
                        </div>
                        <div>
                            <p className={css.Text}>
                                Transport Type: {transportType}
                            </p>
                        </div>
                        <div>
                            <p className={css.Text}>
                                Mileage: {mileage}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.Column3}>
                {cars.map(item => <Car key={item._id} cars={item}/>)}
            </div>
        </div>
    );
};

export default CarDetail;