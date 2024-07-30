import { authToken } from './utils/getUserIdAndAuthToken.js';

function Footer() {

  const logout = async () => {
    try {
      // Clear local storge (if applicable)
  
      // Make the logout request
      const response = await fetch('http://localhost:4000/user/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
  
      if (response.ok) {
        console.log("User logged out successfully");
        localStorage.removeItem('accessToken');
        // Optionally redirect the user
        // window.location.href = '/login';
      } else {
        const error = await response.json();
        console.error('Failed to log out:', error.message);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };
  
  

  return (
    <>
      <div className="flex m-0 justify-center gap-32 items-center w-screen bg-purple-700 text-white">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Qhf-PnjayA0RD6c8_sc14OnsQeZRWxUYhQ&s" className="w-32 h-20" alt="" />
        <div className="flex flex-row items-center">
          <ul className="list-none flex flex-row gap-8">
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Home</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">About</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Contact</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Other Services</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Policy</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Terms and Conditions</li>
          </ul>
        </div>
        <button onClick={()=>logout()} className='py-2 px-5 bg-orange-700 rounded-lg hover:text-lg hover:bg-orange-600'>Logout</button>
      </div>
    </>
  )
}

export default Footer
