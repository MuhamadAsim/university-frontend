import React, { useEffect, useState } from 'react';

const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const StudentEnrollments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${url}/instructor/get_departments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error("Fetch error:", error));
  }, []);


  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem('token');
      const instructor = JSON.parse(localStorage.getItem('user')); // Parse the stored string
      const instructorId = instructor?.email; // Extract the email field
  
      if (!instructorId) {
        console.error('Instructor ID not found in localStorage');
        return;
      }
  
      const response = await fetch(`http://localhost:4000/instructor/get_students_results?departmentId=${selectedDepartment}&instructorId=${instructorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      if (response.ok) {
        setEnrollments(data);
      } else {
        console.error('Error fetching enrollments:', data.message);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };
  

  return (
    <div className="p-4 min-h-screen flex justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        <div className="w-1/4 bg-gray-400 flex items-center justify-center p-6">
          <img src="stu.png" alt="Students" className="w-66 h-66 object-contain" />
        </div>
        
        <div className="w-3/4 p-6 bg-gray-300">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">Student Results</h1>
          <div className="mb-4 flex items-center justify-center gap-4">
            <select
              className="p-2 border rounded bg-white text-gray-900"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentId}>{dept.name}</option>
              ))}
            </select>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={fetchEnrollments}
            >
              Search
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-lg shadow-md bg-gray-300 bg-opacity-80">
              <thead>
                <tr className="bg-gray-500 text-center text-white uppercase text-sm">
                  <th className="px-4 py-2 border-b text-gray-950">Registration No</th>
                  <th className="px-4 py-2 border-b text-gray-950">Course Code</th>
                  <th className="px-4 py-2 border-b text-gray-950">Credit Hours</th>
                  <th className="px-4 py-2 border-b text-gray-950">Grade</th>
                  <th className="px-4 py-2 border-b text-gray-950">Department</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length > 0 ? (
                  enrollments.map((enrollment) => (
                    <tr key={enrollment.studentRegistrationNumber} className="hover:bg-green-200 bg-gray-100 text-black">
                      <td className="px-4 py-2 border-b text-center">{enrollment.studentRegistrationNumber}</td>
                      <td className="px-4 py-2 border-b text-center">{enrollment.courseCode}</td>
                      <td className="px-4 py-2 border-b text-center">{enrollment.credits}</td>
                      <td className="px-4 py-2 border-b text-center">{enrollment.grade}</td>
                      <td className="px-4 py-2 border-b text-center">{enrollment.department}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">No enrollments found.</td>
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

export default StudentEnrollments;
