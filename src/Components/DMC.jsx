import React, { useEffect, useState } from 'react';

const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const DMCReport = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchDMCReport = async () => {
      try {
        const token = localStorage.getItem('token'); // Fetch JWT token from local storage
        const response = await fetch('http://localhost:4000/user/dmc', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setCourses(data.completedCourses); // ✅ Correctly map response
        } else {
          console.error('Error fetching DMC report:', data.message);
        }
      } catch (error) {
        console.error('Error fetching DMC report:', error);
      }
    };

    fetchDMCReport();
  }, []);

  return (
    <div className="p-4 min-h-screen flex justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        <div className="w-1/4 bg-gray-400 flex items-center justify-center p-6">
          <img src="dmc.png" alt="DMC Logo" className="w-66 h-66 object-contain" />
        </div>

        {/* DMC Info Section */}
        <div className="w-3/4 p-6 bg-gray-300">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">DMC Report</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg shadow-md bg-gray-500 bg-opacity-80">
              <thead>
                <tr className="bg-gray-700 text-left text-white uppercase text-sm">
                  <th className="px-4 py-2 border-b">Course ID</th>
                  <th className="px-4 py-2 border-b">Title</th>
                  <th className="px-4 py-2 border-b">Code</th>
                  <th className="px-4 py-2 border-b">Credits</th>
                  <th className="px-4 py-2 border-b">Grade</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <tr key={course.courseId} className="hover:bg-gray-200 bg-gray-400 text-black">
                      <td className="px-4 py-2 border-b">{course.courseId}</td>
                      <td className="px-4 py-2 border-b">{course.title}</td>
                      <td className="px-4 py-2 border-b">{course.code}</td>
                      <td className="px-4 py-2 border-b">{course.credits}</td>
                      <td className="px-4 py-2 border-b font-semibold">{course.grade || 'Not Graded'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">No completed courses found.</td>
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

export default DMCReport;
