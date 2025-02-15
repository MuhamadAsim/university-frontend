import React, { useEffect, useState } from 'react';

const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token

        const response = await fetch(`${url}/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Attach token in header
          }
        });

        const data = await response.json();

        if (response.ok) {
          setStudent(data);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!student) {
    return <h1 className="text-center mt-56 mb-56 text-2xl text-white">Loading student profile...</h1>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-200 flex pt-4 justify-center">
      <div className="bg-gray-300 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        {/* University Logo Section */}
        <div className="w-1/3 bg-gray-400 flex items-center justify-center p-6">
          <img src="profile.png" alt="University Logo" className="w-66 h-66 object-contain" />
        </div>

        {/* Student Info Section */}
        <div className="w-2/3 p-8 ml-2">
          <h1 className="text-3xl font-bold mb-4">Student Profile</h1>
          <div className=" grid grid-cols-2 gap-6 pt-6">
            <span className="font-semibold">Name:</span>
            <span className='ml-6'>{student.fullName}</span>

            <span className="font-semibold">Gender:</span>
            <span className='ml-6'>{student.gender}</span>

            <span className="font-semibold">Registration No:</span>
            <span className='ml-6'>{student.registration_no}</span>

            <span className="font-semibold">Phone No:</span>
            <span className='ml-6'>{student.phoneNo}</span>

            <span className="font-semibold">Address:</span>
            <span className='ml-6'>{student.address}</span>

            <span className="font-semibold">CNIC:</span>
            <span className='ml-6'>{student.cnic}</span>

            <span className="font-semibold">Department:</span>
            <span className='ml-6'>{student.department}</span>

            <span className="font-semibold">Email:</span>
            <span className='ml-6'>{student.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
