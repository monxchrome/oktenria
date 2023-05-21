import React from 'react';
import css from "../LoginPage/login.module.css";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {carActions} from "../../redux/slices/carSlice";
const PostCarPage = () => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()

    const save = async (car) => {
        await dispatch(carActions.create({car}))
    }

    return (
        <div>
            <div className={css.container}>
                <div className={css.loginBox}>
                    <h2>Post car</h2>
                    <form onSubmit={handleSubmit(save)}>
                        <label htmlFor="transportType">transportType</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"transportType"}
                            {...register('transportType')}></input>
                        <label htmlFor="bodyType">bodyType</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"bodyType"}
                            {...register('bodyType')}></input>
                        <label htmlFor="countryCar">countryCar</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"countryCar"}
                            {...register('countryCar')}></input>
                        <label htmlFor="brand">brand</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"brand"}
                            {...register('brand')}></input>
                        <label htmlFor="model">model</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"model"}
                            {...register('model')}></input>
                        <label htmlFor="year">year</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"year"}
                            {...register('year')}></input>
                        <label htmlFor="price">price</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"price"}
                            {...register('price')}></input>
                        <label htmlFor="currency">currency</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"currency"}
                            {...register('currency')}></input>
                        <label htmlFor="country">country</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"country"}
                            {...register('country')}></input>
                        <label htmlFor="city">city</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"city"}
                            {...register('city')}></input>
                        <label htmlFor="state">state</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"state"}
                            {...register('state')}></input>
                        <label htmlFor="credit">credit</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"credit"}
                            {...register('credit')}></input>
                        <label htmlFor="fuel_consumption_per_100_km">fuel_consumption_per_100_km</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"fuel_consumption_per_100_km"}
                            {...register('fuel_consumption_per_100_km')}></input>
                        <label htmlFor="engine_capacity">engine_capacity</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"engine_capacity"}
                            {...register('engine_capacity')}></input>
                        <label htmlFor="power">power</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"power"}
                            {...register('power')}></input>
                        <label htmlFor="mileage">mileage</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"mileage"}
                            {...register('mileage')}></input>
                        <label htmlFor="number_of_doors">number_of_doors</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"number_of_doors"}
                            {...register('number_of_doors')}></input>
                        <label htmlFor="number_of_seats">number_of_seats</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"number_of_seats"}
                            {...register('number_of_seats')}></input>
                        <label htmlFor="fuel">fuel</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"fuel"}
                            {...register('fuel')}></input>
                        <label htmlFor="color">color</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"color"}
                            {...register('color')}></input>
                        <button role="button">Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostCarPage;