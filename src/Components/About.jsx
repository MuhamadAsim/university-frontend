import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-300 text-gray-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-gray-200 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Welcome to the University of Engineering and Technology Lahore, a premier institution dedicated to excellence in engineering education and research. Our mission is to nurture innovation, creativity, and leadership among students, equipping them with the skills and knowledge to shape the future.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          With a rich history and a commitment to academic excellence, UET Lahore provides top-tier programs in various engineering disciplines. Our faculty comprises experienced professionals and researchers who are committed to mentoring and guiding students toward success.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Join us at UET Lahore and be a part of a vibrant community that fosters learning, innovation, and growth.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
