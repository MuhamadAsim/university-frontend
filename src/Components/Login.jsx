import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';
const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${url}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                if(result.user.role === 'admin') {
                    navigate('/dashboard');
                }
                else if(result.user.role === 'instructor') {
                    navigate('/instructor');
                }
                else{
                navigate('/profile');
            }
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className="container">
                <div className="main_box">
                    <div className="login_box" id="login">
                        <div className="heading">
                            <h2><strong>Hello, Again</strong></h2>
                            <p>We are happy to have you back</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="all_inputs">
                            <div className="input">
                                <input
                                    type="text"
                                    className="input_box"
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                {errors.email && (
                                    <p className="error-message">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input_box"
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 1, message: "Password must contain more than 7 characters" },
                                        maxLength: { value: 12, message: "Please enter a password with less than 13 characters" }
                                    })}
                                />
                                <div className='flex flex-row gap-1'>
                                    <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                                    <h1>Show Password</h1>
                                </div>
                                <label htmlFor="password">Password</label>
                                {errors.password && (
                                    <p className="error-message">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="button">
                                <input type="submit" className="submit" value="Login" disabled={isSubmitting} />
                            </div>
                            <div className="forgot">
                                <a href="#">Forgot Password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
