// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import './Style.css';

// export default function Login() {
//     const [btnPosition, setBtnPosition] = useState('0px');

//     const handleButtonClick = (position) => {
//         setBtnPosition(position);
//     };

//     const { register, handleSubmit, formState: { errors, isSubmitting }, trigger, reset } = useForm();

//     const onSubmit = async (data) => {
//         const result = await trigger();
//         if (result) {
//             console.log(data);
//         }

//         try {
//             const response = await fetch('http://localhost:4000/user/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data),
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 console.log("Success ", result);

//                 // Save the access token to local storage
//                 localStorage.setItem('accessToken', result.accessToken);

//                 reset(); // Clear form fields after successful submission
//             } else {
//                 console.log("failed ", result.message);
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     return (
//         <>
//             <div className="container">
//                 <div className="main_box">
//                     <div className="login_box" id="login">
//                         <div className="heading">
//                             <h2><strong>Hello, Again</strong></h2>
//                             <p>We are happy to have you back</p>
//                         </div>
//                         <form onSubmit={handleSubmit(onSubmit)} className="all_inputs">
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     className="input_box"
//                                     id="username"
//                                     {...register("username", {
//                                         required: "username is required",
//                                     })}
//                                 />
//                                 <label htmlFor="username">username</label>
//                                 {errors.username && (
//                                     <p className="error-message">{errors.username.message}</p>
//                                 )}
//                             </div>
//                             <div className="input">
//                                 <input
//                                     type="password"
//                                     className="input_box"
//                                     id="password"
//                                     {...register("password", {
//                                         required: "Password is required",
//                                         minLength: { value: 4, message: "Password must contain more than 4 characters" },
//                                         maxLength: { value: 8, message: "Please enter a password with less than 8 characters" }
//                                     })}
//                                 />
//                                 <label htmlFor="password">Password</label>
//                                 {errors.password && (
//                                     <p className="error-message">{errors.password.message}</p>
//                                 )}
//                             </div>
//                             <div className="button">
//                                 <input type="submit" className="submit" value="Login" disabled={isSubmitting} />
//                             </div>
//                             <div className="forgot">
//                                 <a>Forgot Password?</a>
//                             </div>
//                         </form>
//                     </div>
//                     <div className="switch">
//                         <NavLink
//                             to="/login"
//                             className="login"
//                             onClick={() => handleButtonClick('0px')}
//                         >
//                             Login
//                         </NavLink>
//                         <NavLink
//                             to="/signup"
//                             className="register"
//                             onClick={() => handleButtonClick('150px')}
//                         >
//                             Register
//                         </NavLink>
//                         <div
//                             className="btn_active"
//                             id='btn'
//                             style={{ left: btnPosition }}
//                         ></div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [btnPosition, setBtnPosition] = useState('0px');
    const navigate=useNavigate();
    const handleButtonClick = (position) => {
        setBtnPosition(position);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                let flag=false;
                console.log("Success ", result);
                if (typeof result.data.accessToken === 'string') {
                    try {
                        localStorage.removeItem('accessToken');
                        localStorage.setItem('accessToken', result.data.accessToken);
                        console.log('Access token stored in local storage');
                        navigate('/todo');
                    } catch (storageError) {
                        console.error('Error storing access token:', storageError);
                    }
                } else {
                    console.error('Access token is not a string:', result.data.accessToken);
                }
                reset();
            } else {
                console.log("failed ", result.message);
            }
        } catch (e) {
            console.log(e);
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
                                    id="username"
                                    {...register("username", {
                                        required: "username is required",
                                    })}
                                />
                                <label htmlFor="username">username</label>
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
                            <div className="button">
                                <input type="submit" className="submit" value="Login" disabled={isSubmitting} />
                            </div>
                            <div className="forgot">
                                <a>Forgot Password?</a>
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
                            id='btn'
                            style={{ left: btnPosition }}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
}

