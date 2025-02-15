import Header from './Components/Header';
import Header2 from './Components/Header2';
import Header3 from './Components/Header3';
import Header4 from './Components/Header4';
import { Outlet } from 'react-router-dom';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

function App() {
  const [role, setRole] = useState(null);
  const [tokenChanged, setTokenChanged] = useState(false); // State to trigger re-render

  useEffect(() => {
    const checkRole = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setRole(decoded.role);
          renderHeader();
        } catch (error) {
          console.error('Invalid token:', error);
          setRole(null);
        }
      } else {
        setRole(null);
      }
    };

    checkRole();

    // Listen for localStorage changes to detect login/logout
    const handleStorageChange = () => {
      setTokenChanged(prev => !prev); // Toggle state to trigger re-render
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [tokenChanged]);

  const renderHeader = () => {
    if (role === 'student') return <Header />;
    else if (role === 'admin') return <Header2 />;
    else if (role === 'instructor') return <Header4 />;
    return <Header3 />;
  };

  return (
    <div className="bg-gray-300 w-screen max-w-full overflow-x-hidden">
      {renderHeader()}
      <Outlet />
    </div>
  );
}

export default App;
