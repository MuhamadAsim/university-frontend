import React from "react";


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const HomePage = () => {
  return (
    <div className="m-12 pb-12 bg-gray-300 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full pb-24 max-w-4xl bg-gray-400 p-6 rounded-2xl shadow-lg text-center">
        {/* Logo Section */}
        <div className="mb-6">
          <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center">
          <img src={"uni.png"} className='w-32 h-24' alt="Avatar" />
          </div>
        </div>

        {/* University Name */}
        <h1 className="text-3xl font-bold mb-4">University of Engineering and Technology, Lahore</h1>
        <p className="text-gray-400 text-lg mb-6">
          Excellence in Engineering Education and Research
        </p>

        {/* Call to Action */}
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition">
            Explore Programs
          </button>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold transition">
            Admissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
