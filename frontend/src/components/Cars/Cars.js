import React, {useEffect, useState} from 'react';
import {carsService} from "../../services/carsService";
import Car from "./Car";
import css from './styles/cars.module.css'

const Cars = () => {
    const [cars, setCars] = useState([]);

    const firstCar = cars.slice(-1)

    useEffect(() => {
        carsService.getAll().then(({data}) => setCars(data.data));
    }, [setCars])

    const leftArrow = 'https://cdn-icons-png.flaticon.com/512/271/271220.png'
    const rightArrow = 'https://cdn-icons-png.flaticon.com/512/32/32213.png'

    return (
        <div className={css.Father}>
            <div className={css.Wrap}>
                <div>
                    <img src={leftArrow} className={css.LeftArrow} alt=""/>
                </div>
                <div className={css.CarDiv}>
                    {firstCar.map(item => <Car key={item._id} cars={item}/>)}
                </div>
                <div className={css.PetCars}>
                    {cars.reverse()
                        .slice(1)
                        .map(item => <Car key={item._id} cars={item}/>)}
                </div>
                <div>
                    <img src={rightArrow} className={css.RightArrow} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Cars;