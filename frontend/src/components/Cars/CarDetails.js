import React, {useEffect, useState} from 'react';
import {carsService} from "../../services/carsService";
import CarDetail from "./CarDetail";

const CarDetails = ({carId}) => {
    const [car, setCar] = useState([]);

    useEffect(() => {
        carsService.getById(carId).then(({data}) => setCar([data]))
    }, [carId])

    return (
        <div>
            {car.map(item => <CarDetail key={item._id} car={item}/>)}
        </div>
    );
};

export default CarDetails;