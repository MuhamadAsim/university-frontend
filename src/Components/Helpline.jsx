import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Helpline = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_fcf6be9', 'template_uvdctvr', form.current, {
        publicKey: 'EHrEqq7w8Rqgs9EXc',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className='pt-4 pb-10 bg-gray-200 flex justify-center'>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex">
        {/* Left Section for Logo */}
        <div className="w-1/4 bg-gray-400 flex items-center justify-center p-6 pt-4">
          <img src="helpline.png" alt="Helpline Logo" className="w-66 h-66 object-contain" />
        </div>

        {/* Right Section for Form */}
        <div className="w-3/4 p-6 bg-gray-300 flex flex-col">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
          <form className="space-y-6" ref={form} onSubmit={sendEmail}>
            <div>
              <label className="block text-lg font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                className="w-full p-3 border bg-gray-200 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                className="w-full p-3 border bg-purple-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-3 border bg-purple-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                value="send"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Helpline;
