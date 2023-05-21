import React, {useEffect, useState} from 'react';
import {carsService} from "../../services/carsService";
import Car from "./Car";
import css from './styles/cars.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarSlider from "./CarSlider";
import {Navigate} from "react-router-dom";

const Cars = () => {
    const [cars, setCars] = useState([]);

    const firstCar = cars.slice(-1)

    useEffect(() => {
        carsService.getAll().then(({data}) => setCars(data.data));
    }, [setCars])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
    };

    return (
        <div className={css.Father}>
            <div className={css.Wrap}>
                <div className={css.CarDiv}>
                    {firstCar.map(item => <Car key={item._id} cars={item}/>)}
                </div>
                <div className={css.PetCars}>
                    {cars.reverse()
                        .slice(1)
                        .map(item => <Car key={item._id} cars={item}/>)}
                </div>
            </div>
            <div className={css.Slider}>
                <Slider {...settings} centerPadding="270px">
                        {cars.map(item => <CarSlider key={item._id} cars={item}/>)}
                </Slider>
            </div>
        </div>
    );
};

export default Cars;