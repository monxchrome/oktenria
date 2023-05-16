import React, {useEffect, useState} from 'react';
import {carsService} from "../../services/carsService";
import Car from "./Car";

const Cars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        carsService.getAll().then(({data}) => setCars(data.data));
    }, [setCars])

    return (
        <div>
            <div>
                <div>
                    {cars.slice(-1).map(item => <Car key={item._id} cars={item}/>)}
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default Cars;