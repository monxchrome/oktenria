import React, {useState} from 'react';
import {authService} from "../../services/authService";
import {useForm} from "react-hook-form";
import css from './login.module.css'

const LoginPage = () => {
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState()

    const login = async (userCred) => {
        try {
            await authService.login(userCred)
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
                    <form onSubmit={handleSubmit(login)}>
                        <label htmlFor="username">Email</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"email"}
                            {...register('email')}></input>
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            className={css.text}
                            placeholder={"password"}
                            {...register('password')}></input>
                            <button role="button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;