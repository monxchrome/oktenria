import React from 'react';
import CarDetails from "../../components/Cars/CarDetails";
import {useParams} from "react-router-dom";

const CarDetailsPage = () => {
    const {carId} = useParams()
    return (
        <div>
            <CarDetails carId={carId}/>
        </div>
    );
};

export default CarDetailsPage;