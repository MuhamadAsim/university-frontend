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
        <div className='flex flex-row items-center gap-1'>
          <img src={"uni2.png"} className='w-32 h-20' alt="Avatar" />
        </div>
        <ul className="flex list-none flex-row text-xl gap-8">
          <li className="px-2 flex flex-col items-center">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`
              }
            >
              <img src={"profile.png"} alt="Profile Logo" className="w-11 h-11" />
              Profile
            </NavLink>
          </li>

          <li className="px-2 flex flex-col items-center">
            <NavLink
              to="/edit_courses"
              className={({ isActive }) => `flex flex-col items-center justify-center pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"course.png"} alt="Courses Logo" className="w-11 h-11" />
              Courses
            </NavLink>
          </li>

          <li className="px-2 flex flex-col items-center">
            <NavLink
              to="/edit_department"
              className={({ isActive }) => `flex flex-col items-center justify-center pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"department.png"} alt="DMC Logo" className="w-11 h-11" />
              Departments
            </NavLink>
          </li>

          <li className="px-2 flex flex-col items-center">
            <NavLink
              to="/edit_student"
              className={({ isActive }) => `flex flex-col items-center justify-center pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"stu.png"} alt="Dues Logo" className="w-11 h-11" />
              Students
            </NavLink>
          </li>

          <li className="px-2 flex flex-col items-center">
            <NavLink
              to="/edit_instructor"
              className={({ isActive }) => `flex flex-col items-center justify-center pr-4 pl-3 duration-200 ${isActive ? "text-black underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"prof.png"} alt="Helpline Logo" className="w-11 h-11" />
              Staff
             </NavLink>
          </li>
        </ul>
        <div className="flex flex-row gap-4 text-xl">
          <NavLink to="">
            <button
              className='px-6 py-2 flex items-center justify-center bg-blue-900 text-white rounded-lg hover:text-lg hover:bg-blue-800'
              onClick={() => {
                localStorage.removeItem('token'); // Delete JWT token
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
