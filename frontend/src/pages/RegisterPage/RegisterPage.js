import React, {useState} from 'react';
import css from "../LoginPage/login.module.css";
import {useForm} from "react-hook-form";
import {authService} from "../../services/authService";
import {NavLink} from "react-router-dom";

const RegisterPage = () => {
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState()

    const registerUser = async (userCred) => {
        try {
            await authService.register(userCred)
        } catch (e) {
            if (e.response.status === 401 || e.response.status === 400) {
                setError(e.response.data)
            }
        }
    }

    return (
        <div>
            <div className={css.container}>
                <div className={css.loginBox}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit(registerUser)}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"firstName"}
                            {...register('firstName')}></input>
                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"surname"}
                            {...register('surname')}></input>
                        <label htmlFor="patronymic">Patronymic</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"patronymic"}
                            {...register('patronymic')}></input>
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"age"}
                            {...register('age')}></input>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"email"}
                            {...register('email')}></input>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"phone"}
                            {...register('phone')}></input>
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"password"}
                            {...register('password')}></input>
                        <NavLink to={'/'}>
                            <button role="button">Register</button>
                        </NavLink>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;