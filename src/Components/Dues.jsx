import React, { useEffect, useState } from 'react';


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const DuesPage = () => {
  const [dues, setDues] = useState([]);

  useEffect(() => {
    fetch('your-api-endpoint/dues')
      .then(response => response.json())
      .then(data => {
        setDues(data);
      })
      .catch(error => {
        // Setting default values for testing
        setDues([
          { challan_id: "CH001", rupees: 15000, semester: "Fall 2023", is_paid: true },
          { challan_id: "CH002", rupees: 14000, semester: "Spring 2023", is_paid: false },
          { challan_id: "CH003", rupees: 16000, semester: "Fall 2022", is_paid: true },
        ]);

        console.error('Error fetching dues:', error);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-200 flex pt-4 justify-center">
      <div className="bg-gray-300 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        {/* University Logo Section */}
        <div className="w-1/4 bg-gray-400 flex items-center justify-center p-4">
          <img src="dues.png" alt="University Logo" className="w-66 h-66 object-contain" />
        </div>

        {/* Dues Info Section */}
        <div className="w-3/4 p-6">
          <h1 className="text-3xl font-bold mb-4">Dues Report</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-700 text-left text-white uppercase text-sm">
                  <th className="px-4 py-2 border-b">Challan ID</th>
                  <th className="px-4 py-2 border-b">Rupees</th>
                  <th className="px-4 py-2 border-b">Semester</th>
                  <th className="px-4 py-2 border-b">Is Paid</th>
                </tr>
              </thead>
              <tbody>
                {dues.map((due) => (
                  <tr key={due.challan_id} className="hover:bg-gray-200 bg-gray-400">
                    <td className="px-4 py-2 border-b">{due.challan_id}</td>
                    <td className="px-4 py-2 border-b">{due.rupees}</td>
                    <td className="px-4 py-2 border-b">{due.semester}</td>
                    <td className="px-4 py-2 border-b">
                      <input
                        type="radio"
                        checked={due.is_paid}
                        readOnly
                        className="form-radio text-green-600"
                      />
                      <span className="ml-2">
                        {due.is_paid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuesPage;
