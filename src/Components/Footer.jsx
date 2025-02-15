
function Footer() {
  const authToken = localStorage.getItem('accessToken');
  const logout = async () => {

    localStorage.removeItem('token'); // Delete JWT token
    window.location.href = '/login'; 
    // try {
  
    //   const response = await fetch('http://localhost:4000/user/logout', {
    //     method: 'POST',
    //     credentials: 'include', 
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${authToken}`
    //     }
    //   });
  
    //   if (response.ok) {
    //     console.log("User logged out successfully");
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('accessToken');
    //   } else {
    //     const error = await response.json();
    //     console.error('Failed to log out:', error.message);
    //   }
    // } catch (error) {
    //   console.error('An error occurred during logout:', error);
    // }
  };
  
  

  return (
    <>
      <div className="flex m-0 justify-center gap-32 items-center w-screen bg-gray-800 text-white">
        <img src={"uni2.png"} className="w-32 h-20" alt="" />
        <div className="flex flex-row items-center">
          <ul className="list-none flex flex-row gap-8">
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Profile</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">DMC</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Courses</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Helpline</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Dues</li>
            <li className="hover:underline hover:cursor-pointer hover:font-bold">Terms and Conditions</li>
          </ul>
        </div>
        <button onClick={()=>logout()} className='py-2 px-5 bg-gray-900 rounded-lg hover:text-lg hover:bg-gray-700'>Logout</button>
      </div>
    </>
  )
}

export default Footer
