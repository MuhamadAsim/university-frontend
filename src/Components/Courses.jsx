import React, { useEffect, useState } from 'react';

const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const CourseTable = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses(); // Fetch courses on component load
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token

      const response = await fetch('http://localhost:4000/user/display_course', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach token in header
        }
      });

      const data = await response.json();

      if (response.ok) {
        setAvailableCourses(data.availableCourses);
        setRegisteredCourses(data.registeredCourses);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleRegister = async (courseId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:4000/user/register_courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId }) // Send the courseId to backend
      });

      const data = await response.json();

      if (response.ok) {
        alert('Course registered successfully!');
        fetchCourses(); // Refresh the course lists after registration
      } else {
        alert(data.message || 'Failed to register for the course.');
      }
    } catch (error) {
      console.error('Error registering for course:', error);
    }
  };

  return (
    <div className='pt-4 pb-10 bg-gray-200 flex justify-center'>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        <div className="w-1/4 bg-gray-400 flex items-center justify-center p-6">
          <img src="course.png" alt="Courses Logo" className="w-64 h-64 object-contain" />
        </div>

        <div className="w-3/4 p-6 bg-gray-300 flex flex-col">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Course Registration</h1>

          {/* Registered Courses */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Registered Courses</h2>
            <div className="overflow-x-auto">
              {registeredCourses.length > 0 ? (
                <table className="min-w-full border border-gray-700 rounded-lg shadow-md bg-gray-500 bg-opacity-80">
                  <thead>
                    <tr className="bg-gray-700 text-left text-white uppercase text-sm">
                      <th className="px-4 py-2 border-b">Course Code</th>
                      <th className="px-4 py-2 border-b">Title</th>
                      <th className="px-4 py-2 border-b">Professor</th>
                      <th className="px-4 py-2 border-b">Credit Hours</th>
                      <th className="px-4 py-2 border-b">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredCourses.map((course) => (
                      <tr key={course.courseId} className="hover:bg-gray-200 bg-gray-400 text-black">
                        <td className="px-4 py-2 border-b">{course.code}</td>
                        <td className="px-4 py-2 border-b">{course.title}</td>
                        <td className="px-4 py-2 border-b">{course.instructor ? course.instructor.name : 'N/A'}</td>
                        <td className="px-4 py-2 border-b">{course.credits}</td>
                        <td className="px-4 py-2 border-b">{course.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">No registered courses available.</p>
              )}
            </div>
          </div>

          {/* Available Courses */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Available Courses</h2>
            <div className="overflow-x-auto">
              {availableCourses.length > 0 ? (
                <table className="min-w-full border border-gray-700 rounded-lg shadow-md bg-gray-500 bg-opacity-80">
                  <thead>
                    <tr className="bg-gray-700 text-left text-white uppercase text-sm">
                      <th className="px-4 py-2 border-b">Course Code</th>
                      <th className="px-4 py-2 border-b">Title</th>
                      <th className="px-4 py-2 border-b">Professor</th>
                      <th className="px-4 py-2 border-b">Credit Hours</th>
                      <th className="px-4 py-2 border-b">Register</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableCourses.map((course) => (
                      <tr key={course.courseId} className="hover:bg-gray-200 bg-gray-400 text-black">
                        <td className="px-4 py-2 border-b">{course.code}</td>
                        <td className="px-4 py-2 border-b">{course.title}</td>
                        <td className="px-4 py-2 border-b">{course.instructor ? course.instructor.name : 'N/A'}</td>
                        <td className="px-4 py-2 border-b">{course.credits}</td>
                        <td className="px-4 py-2 border-b">
                          <button 
                            onClick={() => handleRegister(course.courseId)}  // Call register function
                            className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-800">
                            Register
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">No courses available for registration.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
