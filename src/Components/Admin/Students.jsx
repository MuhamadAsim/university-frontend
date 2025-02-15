import React, { useState, useEffect } from 'react';


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newStudent, setNewStudent] = useState({ registrationNumber: '', name: '', gender: '', phoneNo: '', address: '', cnic: '', email: '', password: '', departmentId: '' });
  const [editingEmail, setEditingEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    fetch('http://localhost:4000/admin/get_All_students', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setStudents(data))
    .catch(error => console.error("Error fetching students:", error));
  
    fetch('http://localhost:4000/admin/departments', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setDepartments(data))
    .catch(error => console.error("Error fetching departments:", error));
  }, []);
  
  const handleAddStudent = () => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    fetch('http://localhost:4000/admin/add_student', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include',
      body: JSON.stringify(newStudent)
    })
    .then(response => response.json())
    .then(addedStudent => {
      const department = departments.find(dept => dept.departmentId === addedStudent.departmentId);
      const departmentName = department ? department.name : 'Unknown';
      const studentWithDeptName = { ...addedStudent, departmentName };
      setStudents([...students, studentWithDeptName]);
      setNewStudent({ registrationNumber: '', name: '', gender: '', phoneNo: '', address: '', cnic: '', email: '', password: '', departmentId: '' });
    })
    .catch(error => console.error("Error adding student:", error));
  
    window.location.reload();
  };
  
  const handleDelete = (email) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    fetch(`http://localhost:4000/admin/delete_student/${email}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(() => {
      setStudents(students.filter(student => student.email !== email));
    })
    .catch(error => console.error("Error deleting student:", error));
  };
  
  const handleEdit = (email) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    if (editingEmail === email) {
      const updatedStudent = students.find(student => student.email === email);
      fetch(`http://localhost:4000/admin/edit_student/${email}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach token
        },
        credentials: 'include',
        body: JSON.stringify(updatedStudent)
      })
      .then(() => setEditingEmail(null))
      .catch(error => console.error("Error updating student:", error));
    } else {
      setEditingEmail(email);
    }
  };
  

  const handleChange = (email, field, value) => {
    setStudents(students.map(student => student.email === email ? { ...student, [field]: value } : student));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
        <h2 className="text-xl mb-2">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <input type="text" placeholder="Registration No" value={newStudent.registrationNumber} onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Gender" value={newStudent.gender} onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Phone Number" value={newStudent.phoneNo} onChange={(e) => setNewStudent({ ...newStudent, phoneNo: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Address" value={newStudent.address} onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="CNIC" value={newStudent.cnic} onChange={(e) => setNewStudent({ ...newStudent, cnic: e.target.value })} className="border p-2 rounded" />
          <input type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} className="border p-2 rounded" />
          <input type="password" placeholder="Password" value={newStudent.password} onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })} className="border p-2 rounded" />
          <select value={newStudent.departmentId} onChange={(e) => setNewStudent({ ...newStudent, departmentId: e.target.value })} className="border p-2 rounded">
            <option value="">Select Department</option>
            {departments.map(dept => <option key={dept.departmentId} value={dept.departmentId}>{dept.name}</option>)}
          </select>
        </div>
        <button onClick={handleAddStudent} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded mt-2 w-full md:w-auto">Add Student</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-400">
            <tr>
              <th className="border p-2">Registration No</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">CNIC</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Password</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.email} className="bg-gray-100 hover:bg-red-100">
                <td className="border p-2">{student.registrationNumber}</td>
                <td className="border p-2">{editingEmail === student.email ? <input type="text" value={student.name} onChange={(e) => handleChange(student.email, 'name', e.target.value)} className="border p-1 rounded w-full" /> : student.name}</td>
                <td className="border p-2">{editingEmail === student.email ? <input type="text" value={student.gender} onChange={(e) => handleChange(student.email, 'gender', e.target.value)} className="border p-1 rounded w-full" /> : student.gender}</td>
                <td className="border p-2">{editingEmail === student.email ? <input type="text" value={student.phoneNo} onChange={(e) => handleChange(student.email, 'phoneNo', e.target.value)} className="border p-1 rounded w-full" /> : student.phoneNo}</td>
                <td className="border p-2">{editingEmail === student.email ? <input type="text" value={student.address} onChange={(e) => handleChange(student.email, 'address', e.target.value)} className="border p-1 rounded w-full" /> : student.address}</td>
                <td className="border p-2">{editingEmail === student.email ? <input type="text" value={student.cnic} onChange={(e) => handleChange(student.email, 'cnic', e.target.value)} className="border p-1 rounded w-full" /> : student.cnic}</td>
                <td className="border p-2">{editingEmail === student.email ? <input type="email" value={student.email} onChange={(e) => handleChange(student.email, 'email', e.target.value)} className="border p-1 rounded w-full" /> : student.email}</td>
                <td className="border p-2">{editingEmail === student.email ? <input type="password" value={student.password} onChange={(e) => handleChange(student.email, 'password', e.target.value)} className="border p-1 rounded w-full" /> : student.password}</td>
                <td className="border p-2">{student.departmentName || 'Unknown'}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button onClick={() => handleEdit(student.email)} className="bg-green-500 text-white p-1 rounded w-full md:w-auto">{editingEmail === student.email ? 'Save' : 'Edit'}</button>
                  <button onClick={() => handleDelete(student.email)} className="bg-red-600 text-white p-1 rounded w-full md:w-auto">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
