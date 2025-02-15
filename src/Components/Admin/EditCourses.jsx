import React, { useState, useEffect } from 'react';


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [newCourse, setNewCourse] = useState({ courseId: '', courseCode: '', title: '', creditHours: '', departmentId: '', instructorId: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    fetch('http://localhost:4000/admin/courses', { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response);
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setCourses(data); 
      } else {
        console.error("Invalid API response:", data);
        setCourses([]);
      }
    })
    .catch(error => {
      console.error("Error fetching courses:", error);
      setCourses([]);
    });
  
    fetch('http://localhost:4000/admin/departments', { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setDepartments(data));
  
    fetch('http://localhost:4000/admin/instructors', { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setInstructors(data));
  
  }, []);
  
  const handleAddCourse = () => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    const userConfirmed = window.confirm("Are you sure you want to add this course?");
    
    if (userConfirmed) {
      fetch('http://localhost:4000/admin/addcourse', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach token
        },
        credentials: 'include',
        body: JSON.stringify(newCourse)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add course');
        }
        return response.json();
      })
      .then(addedCourse => {
        setCourses([...courses, addedCourse]);
        setNewCourse({ courseId: '', courseCode: '', title: '', creditHours: '', departmentId: '', instructorId: '' });
        window.location.reload(); // Reload if course is successfully added
        alert('Course added successfully!');
      })
      .catch(error => {
        console.error('Error adding course:', error);
        alert('An error occurred while adding the course. Please try again.');
      });
    } else {
      alert('Course addition canceled.');
    }
  };
  
  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    fetch(`http://localhost:4000/admin/deletecourse/${id}`, { 
      method: 'DELETE', 
      headers: { 
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(() => setCourses(courses.filter(course => course.courseId !== id)));
  };
  
  const handleEdit = (id) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    if (editingId === id) {
      const updatedCourse = courses.find(course => course.courseId === id);
  
      fetch(`http://localhost:4000/admin/updatecourse/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach token
        },
        credentials: 'include',
        body: JSON.stringify(updatedCourse)
      })
      .then(() => setEditingId(null));
    } else {
      setEditingId(id);
    }
  };
  

  const handleChange = (id, field, value) => {
    setCourses(courses.map(course => course.courseId === id ? { ...course, [field]: value } : course));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
        <h2 className="text-xl mb-2">Add New Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          <input type="text" placeholder="Course ID" value={newCourse.courseId} onChange={(e) => setNewCourse({ ...newCourse, courseId: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Course Code" value={newCourse.courseCode} onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Credit Hours" value={newCourse.creditHours} onChange={(e) => setNewCourse({ ...newCourse, creditHours: e.target.value })} className="border p-2 rounded" />
          <select value={newCourse.departmentId} onChange={(e) => setNewCourse({ ...newCourse, departmentId: e.target.value })} className="border p-2 rounded">
            <option value="">Select Department</option>
            {departments.map(dept => <option key={dept.departmentId} value={dept.departmentId}>{dept.name}</option>)}
          </select>
          <select value={newCourse.instructorId} onChange={(e) => setNewCourse({ ...newCourse, instructorId: e.target.value })} className="border p-2 rounded">
            <option value="">Select Instructor</option>
            {instructors.map(instr => <option key={instr.instructorId} value={instr.instructorId}>{instr.name}</option>)}
          </select>
        </div>
        <button onClick={handleAddCourse} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded mt-2 w-full md:w-auto">Add Course</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-400">
            <tr>
              <th className="border p-2">Course ID</th>
              <th className="border p-2">Course Code</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Credit Hours</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Instructor</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
  {courses.map(course => (
    <tr key={course.courseId} className="bg-gray-100 hover:bg-red-100">
      <td className="border p-2">{course.courseId}</td>
      
      <td className="border p-2">
        {editingId === course.courseId ? (
          <input
            type="text"
            value={course.code}
            onChange={(e) => handleChange(course.courseId, 'code', e.target.value)}
            className="border p-1 rounded w-full"
          />
        ) : (
          course.code
        )}
      </td>

      <td className="border p-2">
        {editingId === course.courseId ? (
          <input
            type="text"
            value={course.title}
            onChange={(e) => handleChange(course.courseId, 'title', e.target.value)}
            className="border p-1 rounded w-full"
          />
        ) : (
          course.title
        )}
      </td>

      <td className="border p-2">
        {editingId === course.courseId ? (
          <input
            type="text"
            value={course.credits}
            onChange={(e) => handleChange(course.courseId, 'credits', e.target.value)}
            className="border p-1 rounded w-full"
          />
        ) : (
          course.credits
        )}
      </td>

      <td className="border p-2">{course.departmentName || 'Unknown'}</td>
      <td className="border p-2">{course.instructorName || 'Unknown'}</td>

      <td className="border p-2 flex gap-2 justify-center">
        <button 
          onClick={() => handleEdit(course.courseId)} 
          className="bg-green-500 text-white p-1 rounded w-full md:w-auto"
        >
          {editingId === course.courseId ? 'Save' : 'Edit'}
        </button>
        <button 
          onClick={() => handleDelete(course.courseId)} 
          className="bg-red-600 text-white p-1 rounded w-full md:w-auto"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>


        </table>
      </div>
    </div>
  );
};

export default CoursesPage;
