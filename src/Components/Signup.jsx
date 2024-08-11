import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';
import { NavLink } from 'react-router-dom';

export default function Signup() {
    const [btnPosition, setBtnPosition] = useState('150px');
    const navigate = useNavigate(); 

    const handleButtonClick = (position) => {
        setBtnPosition(position);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger, reset } = useForm();

    const onSubmit = async (data) => {
        const result = await trigger();
        if (result) {
            console.log(data); 

            try {
                const response = await fetch('http://localhost:4000/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    console.log('Registration successful:', result);
                    reset();
                    navigate('/login');
                } else {
                    console.error('Registration failed:', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    return (
        <>
            <div className="container">
                <div className="main_box">
                    <div className="login_box" id="register">
                        <div className="heading">
                            <h2><strong>Register Now</strong></h2>
                            <p>We are happy to have you with us</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="all_inputs">
                            <div className="input">
                                <input
                                    type="text"
                                    className="input_box"
                                    id="username"
                                    {...register("username", {
                                        required: "username is required",
                                        minLength: { value: 4, message: "username must contain more than 4 characters" },
                                        maxLength: { value: 8, message: "please enter a username with less than 8 characters" }
                                    })}
                                />
                                <label htmlFor="username">Username</label>
                                {errors.username && (
                                    <p className="error-message">{errors.username.message}</p>
                                )}
                            </div>
                            <div className="input">
                                <input
                                    type="password"
                                    className="input_box"
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 4, message: "Password must contain more than 4 characters" },
                                        maxLength: { value: 8, message: "Please enter a password with less than 8 characters" }
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                {errors.password && (
                                    <p className="error-message">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="input">
                                <input
                                    type="text"
                                    className="input_box"
                                    id="email_adress"
                                    {...register("email", {
                                        required: "Email Address is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Enter a valid email address"
                                        }
                                    })}
                                />
                                <label htmlFor="email_adress">Email Address</label>
                                {errors.email && (
                                    <p className="error-message">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="button">
                                <input type="submit" className="submit" value="Register" disabled={isSubmitting} />
                            </div>
                        </form>
                    </div>
                    <div className="switch">
                        <NavLink
                            to="/login"
                            className="login"
                            onClick={() => handleButtonClick('0px')}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="register"
                            onClick={() => handleButtonClick('150px')}
                        >
                            Register
                        </NavLink>
                        <div
                            className="btn_active"
                            id="btn"
                            style={{ left: btnPosition }}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
}
