import React from 'react';
import Cars from "../../components/Cars/Cars";
import CarsFilter from "../../components/Cars/CarsFilter";

const MainPage = () => {
    return (
        <div>
            <Cars/>
            <CarsFilter/>
        </div>
    );
};

export default MainPage;