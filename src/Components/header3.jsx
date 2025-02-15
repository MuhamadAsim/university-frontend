import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Header.css';

function Header3() {


  return (
    <>
      <div className="flex justify-around items-center w-screen text-white bg-gray-700">
        <div className='flex flex-row items-center gap-1'>
          <img src={"uni2.png"} className='w-32 h-20' alt="Avatar" />
        </div>
        <ul className="flex list-none flex-row text-xl gap-8">
          <li className="px-2 flex flex-col items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block pr-4 pl-3 duration-200 ${isActive ? "text-gray-900 underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent flex flex-col items-center justify-center lg:border-0 hover:text-gray-900 lg:p-0`
              }
            >
              <img src={"home.png"} alt="Profile Logo" className="w-10 h-10" />
              Home
            </NavLink>
          </li>



    

          <li className="px-2 flex flex-col items-center">
            <NavLink
              to="/about"
              className={({ isActive }) => `flex flex-col items-center justify-center py-1 pr-4 pl-3 duration-200 ${isActive ? "text-gray-900 underline" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-900 lg:p-0`}
            >
              <img src={"prof.png"} alt="Helpline Logo" className="w-10 h-10" />
              About Us
             </NavLink>
          </li>
        </ul>


        <div className=" flex flex-row gap-4 text-xl">
          <NavLink to="/login">
            <button className='py-2 px-8 flex items-center text-white justify-center bg-blue-900 rounded-lg hover:text-lg hover:bg-blue-800'>
              Login
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header3;
