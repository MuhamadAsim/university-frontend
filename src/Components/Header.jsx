import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Header.css';

function Header() {
  const [user, setUser] = useState(null);
  const [avatarSrc, setavatarsrc] = useState("logo.png");
  const [isActive, setisactive] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      setavatarsrc(user?.avatar);
    }
  }, []);

  return (
    <>
      <div className="flex justify-around items-center w-screen text-white bg-gray-800">
        <div className='flex flex-row items-center '>
          <img src={"uni2.png"} className='w-32 h-20' alt="Avatar" />
        </div>
        <ul className="flex list-none flex-row text-xl gap-8">
          <li className=" px-2 flex flex-col items-center">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex flex-col items-center pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`
              }
            >
              <img src={"profile.png"} alt="Profile Logo" className="w-11 h-11" />
              Profile
            </NavLink>
          </li>

          <li className=" px-2 flex flex-col items-center">
            <NavLink
              to="/courses"
              className={({ isActive }) => `  pr-4 pl-3 flex flex-col items-center duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"course.png"} alt="Courses Logo" className="w-11 h-11" />
              Courses
            </NavLink>
          </li>

          <li className=" px-2 flex flex-col items-center">
            <NavLink
              to="/dmc"
              className={({ isActive }) => `flex flex-col items-center  pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"dmc.png"} alt="DMC Logo" className="w-11 h-11" />
              DMC
            </NavLink>
          </li>

          <li className=" px-2 flex flex-col items-center">
            <NavLink
              to="/dues"
              className={({ isActive }) => `flex flex-col items-center  pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"dues.png"} alt="Dues Logo" className="w-11 h-11" />
              Dues
            </NavLink>
          </li>

          <li className=" px-2 flex flex-col items-center">
            <NavLink
              to="/helpline"
              className={({ isActive }) => `flex flex-col items-center  pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"helpline.png"} alt="Helpline Logo" className="w-11 h-11" />
              Helpline
            </NavLink>
          </li>
        </ul>
        <div className="flex flex-row gap-4 text-xl">
          <NavLink to="/">
            <button
              className='py-2 px-6 flex items-center justify-center bg-blue-900 text-white rounded-lg hover:text-lg hover:bg-blue-800'
              onClick={() => {
                localStorage.removeItem('token'); // Delete JWT token
                localStorage.removeItem('user'); // Delete JWT token
                window.location.href = '/login'; // Redirect to login page
              }}
            >
              Logout
            </button>

          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
