export default function About() {
    return (
        <div className="flex flex-col min-h-screen ">
            <main className="flex-grow p-8">
                <section className="bg-purple-300 text-purple-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center text-purple-700">About Todo App</h2>
                    <p className="mb-4 text-lg ">
                        Welcome to the Todo App, your simple solution to managing daily tasks and staying organized.
                        Our application is designed to help you efficiently track your to-do list, ensuring you never miss a task again.
                    </p>
                    <p className="mb-4 text-lg">
                        With the Todo App, you can:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-lg">
                        <li>Add new tasks quickly and easily.</li>
                        <li>Edit and update existing tasks.</li>
                        <li>Mark tasks as completed.</li>
                        <li>Delete tasks you no longer need.</li>
                    </ul>
                    <p className="mb-4 text-lg">
                        Our mission is to provide a straightforward and effective way to manage your daily activities.
                        We believe that by helping you stay organized, we can help you achieve your goals and improve your productivity.
                    </p>
                    <p className="text-lg">
                        Thank you for choosing Todo App. We hope it helps you stay on top of your tasks and get things done!
                    </p>
                </section>
            </main>
        </div>
    );
}
