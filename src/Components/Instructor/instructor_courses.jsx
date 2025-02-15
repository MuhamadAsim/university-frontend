import React, { useEffect, useState } from 'react';


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/instructor/current_courses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setCourses(data);
        } else {
          console.error('Error fetching instructor courses:', data.message);
        }
      } catch (error) {
        console.error('Error fetching instructor courses:', error);
      }
    };

    fetchInstructorCourses();
  }, []);

  return (
    <div className="p-4 min-h-screen flex justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        <div className="w-1/4 bg-gray-400 flex items-center justify-center p-6">
          <img src="course.png" alt="Courses" className="w-66 h-66 object-contain" />
        </div>

        <div className="w-3/4 p-6 bg-gray-300">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">Instructor's Courses</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg shadow-md bg-gray-500 bg-opacity-80">
              <thead>
                <tr className="bg-gray-500 text-center text-white uppercase text-sm">
                  <th className="px-4 py-2 border-b text-gray-950">Course Code</th>
                  <th className="px-4 py-2 border-b text-gray-950">Title</th>
                  <th className="px-4 py-2 border-b text-gray-950">Credit Hours</th>
                  <th className="px-4 py-2 border-b text-gray-950">Total Students</th>
                  <th className="px-4 py-2 border-b text-gray-950">Department</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <tr key={course.code} className="hover:bg-green-200 bg-gray-100 text-black">
                      <td className="px-4 py-2 border-b text-center">{course.code}</td>
                      <td className="px-4 py-2 border-b text-center">{course.title}</td>
                      <td className="px-4 py-2 border-b text-center">{course.credits}</td>
                      <td className="px-4 py-2 border-b text-center">{course.totalStudents}</td>
                      <td className="px-4 py-2 border-b text-center">{course.department}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">No courses found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCourses;
