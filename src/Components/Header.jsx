import { NavLink } from "react-router-dom"


function Header() {

 

  return (
    <>
      <div className="flex justify-around items-center w-screen text-white bg-purple-600 py-1">
        <div className='flex flex-row items-center gap-1'><img src="logo.png" className='w-16 h-12' alt="" /><h1 className='font-bold text-xl'>Todo App</h1></div>
        <ul className="flex list-none flex-row text-xl gap-4">
          <li className="py-2 px-2"><NavLink to="/" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700 underline" : "text-white"}  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`} >Home</NavLink></li>
          <li className="py-2 px-2"><NavLink to="/todo" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700 underline" : "text-white"}  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`} >TodoList</NavLink></li>
          <li className="py-2 px-2"><NavLink to="/about" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700 underline" : "text-white"}  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`} >About</NavLink></li>
          <li className="py-2 px-2"><NavLink to="/contact" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700 underline" : "text-white"}  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`} >Contact</NavLink></li>
        </ul>
        <div className="flex flex-row gap-2 text-xl">
          <NavLink to="/login"><button className='py-2 px-6 bg-purple-800 rounded-lg hover:text-lg hover:bg-purple-900'>Login</button></NavLink>
          <NavLink to="/signup"><button className='py-2 px-5 bg-purple-800 rounded-lg hover:text-lg hover:bg-purple-900'>Signup</button></NavLink>
        </div>
      </div>
    </>
  )
}

export default Header
