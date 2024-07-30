
export default function ContactUs() {
    return (
        <section className="bg-purple-300 p-8 text-purple-700 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
            <form className="space-y-6">
                <div>
                    <label className="block text-lg font-bold  mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-3 border bg-purple-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
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
                        name="email"
                        className="w-full p-3 border bg-purple-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500"
                        placeholder="Your Email"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-bold  mb-2" htmlFor="message">
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
                        className="px-6 py-3 bg-purple-700 text-white rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </section>
    );
}
