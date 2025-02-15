import React, { useState, useEffect } from 'react';


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const AdminDashboard = () => {
  const [adminDetails, setAdminDetails] = useState({ email: '', password: '' });
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({ email: '', newEmail: '', newPassword: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const token = localStorage.getItem('token'); // Retrieve JWT token
  
    if (user && user.email) {
      console.log("Retrieved user email:", user.email);
  
      const url = `http://localhost:4000/admin/get_admin?email=${encodeURIComponent(user.email)}`;
  
      fetch(url, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach token here
        },
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch admin details');
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.data) {
            setAdminDetails(data.data);
            setUpdatedDetails({
              email: data.data.email || '',  // Current email
              newEmail: '',                  
              newPassword: '',               
            });
          } else {
            console.error('Invalid response format:', data);
          }
        })
        .catch((error) => console.error('Error fetching admin details:', error));
    } else {
      console.error('User information not found in localStorage');
    }
  }, []);

  

  const handleUpdate = () => {
    if (!updatedDetails.email) {
      console.error('Email cannot be empty');
      return;
    }
    const token = localStorage.getItem('token'); // Retrieve JWT token

    console.log('Current Email:', updatedDetails.email);
    console.log('New Email:', updatedDetails.newEmail);
    console.log('New Password:', updatedDetails.newPassword);

    fetch('http://localhost:4000/admin/update_admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}` // Attach token here
       },
      credentials: 'include',
      body: JSON.stringify({
        email: updatedDetails.email,           // Current email for lookup
        newEmail: updatedDetails.newEmail,     // New email if provided
        newPassword: updatedDetails.newPassword // New password if provided
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update admin details');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data) {
          setAdminDetails(data.data);  // Update with new details
          setEditMode(false);          // Exit edit mode
        } else {
          console.error('Invalid response format during update:', data);
        }
      })
      .catch((error) => console.error('Error updating admin details:', error));
      window.location.reload();
      alert("Updated Successfully");

  };

  return (
    <div className="flex h-screen p-4">
      {/* Left Section - University Logo */}
      <div className="w-1/3 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg p-4">
        <img src="uni.png" alt="University Logo" className="w-64 h-64 object-contain" />
      </div>

      {/* Right Section - Admin Details */}
      <div className="w-2/3 p-8 bg-gray-200 rounded-lg shadow-lg ml-4">
        <h1 className="text-2xl font-bold mb-4">Admin Account Details</h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img src="avatar2.jpg" alt="Profile" className="w-48 h-48 rounded-full border-gray-300" />
        </div>

        {/* Email and Password */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-900 font-semibold">Email:</label>
            {editMode ? (
              <input
                type="email"
                value={updatedDetails.newEmail || adminDetails.email}
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, newEmail: e.target.value })}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{adminDetails.email || 'N/A'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Password:</label>
            {editMode ? (
              <input
                type="password"
                value={updatedDetails.newPassword}
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, newPassword: e.target.value })}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{adminDetails.password ? '********' : 'N/A'}</p>
            )}
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-6">
          {editMode ? (
            <button onClick={handleUpdate} className="bg-green-500 text-white p-2 rounded w-full">
              Save Changes
            </button>
          ) : (
            <button onClick={() => setEditMode(true)} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-full">
              Edit Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
