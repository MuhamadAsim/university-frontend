import React, { useState, useEffect } from 'react';


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ departmentId: '', name: '', hod: '', location: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    fetch('http://localhost:4000/admin/get_All_Departments', { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setDepartments(Array.isArray(data) ? data : []))
    .catch(error => {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    });
  }, []);
  
  const handleAddDepartment = () => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    fetch('http://localhost:4000/admin/add_department', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include',
      body: JSON.stringify(newDepartment)
    })
    .then(response => response.json())
    .then(addedDepartment => {
      setDepartments([...departments, addedDepartment]);
      setNewDepartment({ departmentId: '', name: '', hod: '', location: '' });
    });
  };
  
  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    fetch(`http://localhost:4000/admin/delete_department/${id}`, { 
      method: 'DELETE', 
      headers: {
        'Authorization': `Bearer ${token}` // Attach token
      },
      credentials: 'include'
    })
    .then(() => setDepartments(departments.filter(dept => dept.departmentId !== id)));
  };
  
  const handleEdit = (id) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    if (editingId === id) {
      const updatedDepartment = departments.find(dept => dept.departmentId === id);
      
      fetch(`http://localhost:4000/admin/update_department/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach token
        },
        credentials: 'include',
        body: JSON.stringify(updatedDepartment)
      })
      .then(() => setEditingId(null));
    } else {
      setEditingId(id);
    }
  };
  
  const handleChange = (id, field, value) => {
    setDepartments(departments.map(dept => dept.departmentId === id ? { ...dept, [field]: value } : dept));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
        <h2 className="text-xl mb-2">Add New Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input type="text" placeholder="Department ID" value={newDepartment.departmentId} onChange={(e) => setNewDepartment({ ...newDepartment, departmentId: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Name" value={newDepartment.name} onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="HOD" value={newDepartment.hod} onChange={(e) => setNewDepartment({ ...newDepartment, hod: e.target.value })} className="border p-2 rounded" />
          <input type="text" placeholder="Location" value={newDepartment.location} onChange={(e) => setNewDepartment({ ...newDepartment, location: e.target.value })} className="border p-2 rounded" />
        </div>
        <button onClick={handleAddDepartment} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded mt-2 w-full md:w-auto">Add Department</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-400">
            <tr>
              <th className="border p-2">Department ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">HOD</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dept => (
              <tr key={dept.departmentId} className="bg-gray-100 hover:bg-red-100">
                <td className="border p-2">{dept.departmentId}</td>
                <td className="border p-2">
                  {editingId === dept.departmentId ? (
                    <input
                      type="text"
                      value={dept.name}
                      onChange={(e) => handleChange(dept.departmentId, 'name', e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    dept.name
                  )}
                </td>
                <td className="border p-2">
                  {editingId === dept.departmentId ? (
                    <input
                      type="text"
                      value={dept.hod}
                      onChange={(e) => handleChange(dept.departmentId, 'hod', e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    dept.hod
                  )}
                </td>
                <td className="border p-2">
                  {editingId === dept.departmentId ? (
                    <input
                      type="text"
                      value={dept.location}
                      onChange={(e) => handleChange(dept.departmentId, 'location', e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    dept.location
                  )}
                </td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button 
                    onClick={() => handleEdit(dept.departmentId)} 
                    className="bg-green-500 text-white p-1 rounded w-full md:w-auto"
                  >
                    {editingId === dept.departmentId ? 'Save' : 'Edit'}
                  </button>
                  <button 
                    onClick={() => handleDelete(dept.departmentId)} 
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

export default DepartmentsPage;
