import React, { useState, useEffect } from 'react';


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newInstructor, setNewInstructor] = useState({
    instructorId: '', name: '', email: '', phoneNo: '', password: '', departmentId: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [editingInstructor, setEditingInstructor] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('token'); 
  
    fetch('http://localhost:4000/admin/get_All_instructors', { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setInstructors(data))
    .catch(error => console.error("Error fetching instructors:", error));
  
    fetch('http://localhost:4000/admin/departments', { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setDepartments(data))
    .catch(error => console.error("Error fetching departments:", error));
  }, []);
  
  const handleAddInstructor = () => {
    const token = localStorage.getItem('token'); 
    const userConfirmed = window.confirm("Are you sure you want to add this Instructor?");

  if(userConfirmed){
    fetch('http://localhost:4000/admin/add_Instructor', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      credentials: 'include',
      body: JSON.stringify(newInstructor)
    })
    .then(response => response.json())
    .then(addedInstructor => {
      setInstructors(prev => [...prev, addedInstructor]);
      setNewInstructor({ instructorId: '', name: '', email: '', phoneNo: '', password: '', departmentId: '' });
      window.location.reload(); // Reload if course is successfully added
      alert('Instructor added successfully!');
    })
    .catch(error => console.error("Error adding instructor:", error));
  }
  };
  
  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); 
  
    fetch(`http://localhost:4000/admin/delete_instructor/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
      credentials: 'include'
    })
    .then(() => setInstructors(prev => prev.filter(instr => instr.instructorId !== id)))
    .catch(error => console.error("Error deleting instructor:", error));
  };
  
  const handleEdit = (id) => {
    const token = localStorage.getItem('token'); 
  
    if (editingId === id) {
      // Save changes
      fetch(`http://localhost:4000/admin/edit_instructor/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        credentials: 'include',
        body: JSON.stringify(editingInstructor)
      })
      .then(() => {
        setInstructors(prev =>
          prev.map(instr =>
            instr.instructorId === id ? { ...instr, ...editingInstructor } : instr
          )
        );
        setEditingId(null);
        setEditingInstructor(null);
      })
      .catch(error => console.error("Error updating instructor:", error));
    } else {
      const selectedInstructor = instructors.find(instr => instr.instructorId === id);
      setEditingInstructor({ ...selectedInstructor });
      setEditingId(id);
    }
  };
  

  const handleChange = (field, value) => {
    setEditingInstructor(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Instructors</h1>

      <div className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
        <h2 className="text-xl mb-2">Add New Instructor</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          <input type="text" placeholder="Instructor ID" value={newInstructor.instructorId} onChange={(e) => setNewInstructor({ ...newInstructor, instructorId: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Name" value={newInstructor.name} onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })} className="border p-2 rounded" />
          <input type="email" placeholder="Email" value={newInstructor.email} onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Phone Number" value={newInstructor.phoneNo} onChange={(e) => setNewInstructor({ ...newInstructor, phoneNo: e.target.value })} className="border p-2 rounded" />
          <input type="password" placeholder="Password" value={newInstructor.password} onChange={(e) => setNewInstructor({ ...newInstructor, password: e.target.value })} className="border p-2 rounded" />
          <select value={newInstructor.departmentId} onChange={(e) => setNewInstructor({ ...newInstructor, departmentId: e.target.value })} className="border p-2 rounded">
            <option value="">Select Department</option>
            {departments.map(dept => <option key={dept.departmentId} value={dept.departmentId}>{dept.name}</option>)}
          </select>
        </div>
        <button onClick={handleAddInstructor} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded mt-2 w-full md:w-auto">Add Instructor</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-400">
            <tr>
              <th className="border p-2">Instructor ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Password</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map(instr => (
              <tr key={instr.instructorId} className="bg-gray-100 hover:bg-red-100">
                <td className="border p-2">{instr.instructorId}</td>

                <td className="border p-2">
                  {editingId === instr.instructorId ? (
                    <input type="text" value={editingInstructor?.name || ""} onChange={(e) => handleChange('name', e.target.value)} className="border p-1 rounded w-full" />
                  ) : instr.name}
                </td>

                <td className="border p-2">{instr.email}</td>

                <td className="border p-2">
                  {editingId === instr.instructorId ? (
                    <input type="text" value={editingInstructor?.phoneNo || ""} onChange={(e) => handleChange('phoneNo', e.target.value)} className="border p-1 rounded w-full" />
                  ) : instr.phoneNo}
                </td>

                <td className="border p-2">
                  {editingId === instr.instructorId ? (
                    <input type="password" value={editingInstructor?.password || ""} onChange={(e) => handleChange('password', e.target.value)} className="border p-1 rounded w-full" />
                  ) : "••••••"}
                </td>

                <td className="border p-2">{instr.departmentName}</td>

                <td className="border p-2 flex gap-2 justify-center">
                  <button onClick={() => handleEdit(instr.instructorId)} className="bg-green-500 text-white p-1 rounded w-full md:w-auto">
                    {editingId === instr.instructorId ? 'Save' : 'Edit'}
                  </button>
                  <button onClick={() => handleDelete(instr.instructorId)} className="bg-red-600 text-white p-1 rounded w-full md:w-auto">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorsPage;
