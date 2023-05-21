import React, {useEffect, useState} from 'react';
import {carsService} from "../../services/carsService";
import Car from "../../components/Cars/Car";
import css from '../styles/newcars.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NewAutosPage = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
    };

    const [cars, setCars] = useState([]);

    useEffect(() => {
        carsService.getAll().then(({data}) => setCars(data.data))
    }, [setCars])

    return (
        <div className={css.Father}>
            <Slider {...settings} centerPadding="100px">
                {cars?.filter(item => item.state === 'new').map(item => <Car key={item._id} cars={item}/>)}
            </Slider>
        </div>
    );
};

export default NewAutosPage;