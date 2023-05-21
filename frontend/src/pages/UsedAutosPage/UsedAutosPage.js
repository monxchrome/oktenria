import React, {useEffect, useState} from 'react';
import {carsService} from "../../services/carsService";
import Car from "../../components/Cars/Car";
import Slider from "react-slick";
import css from '../styles/newcars.module.css'

const UsedAutosPage = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        carsService.getAll().then(({data}) => setCars(data.data))
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
            <Slider {...settings} centerPadding="100px">
                {cars?.filter(item =>
                    item.state === 'accident' ||
                    item.state === 'damaged' ||
                    item.state === 'drowned' ||
                    item.state === 'broken').map(item => <Car key={item._id} cars={item}/>)}
            </Slider>
        </div>
    );
};

export default UsedAutosPage;