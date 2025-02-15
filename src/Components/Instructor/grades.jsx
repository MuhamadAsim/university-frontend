import React, { useState, useEffect } from 'react';


const url = import.meta.env.VITE_API_URL; // ✅ Works in Vite


const Grades = () => {
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [grades, setGrades] = useState({});
    const [confirmedGrades, setConfirmedGrades] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:4000/instructor/get_departments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setDepartments(data))
            .catch(error => console.error("Fetch error:", error));
    }, []);

    const fetchCourses = (departmentId) => {
        const token = localStorage.getItem('token');

        fetch(`http://localhost:4000/instructor/get_course/${departmentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    };

    const fetchStudents = () => {
        const token = localStorage.getItem('token');

        if (!selectedCourse || !selectedDepartment) {
            console.error("Course ID or Department ID is missing");
            return;
        }

        fetch(`http://localhost:4000/instructor/get_students?courseId=${selectedCourse}&departmentId=${selectedDepartment}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.data) {
                    console.error("Invalid response structure:", data);
                    return;
                }

                setStudents(data.data.studentRegistrationNumbers.map(regNo => ({
                    registrationNo: regNo,
                    courseTitle: data.data.course?.title || "Unknown",
                    credits: data.data.course?.credits || "N/A",
                    departmentName: data.data.department?.name || "Unknown"
                })));
            })
            .catch(error => console.error("Error fetching students:", error));
    };

    const handleGradeChange = (registrationNo, grade) => {
        setGrades({ ...grades, [registrationNo]: grade });

        if (grade !== "Not Graded") {
            setConfirmedGrades(prev => ({
                ...prev,
                [registrationNo]: true
            }));
        }
    };

    const handleConfirm = (registrationNo) => {
        const token = localStorage.getItem('token');
    
        fetch('http://localhost:4000/instructor/update_student_grade', {
            method: 'PUT', // Change to PUT for updates
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                registrationNo,
                courseId: selectedCourse,
                grade: grades[registrationNo] || 'A',
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message); // Show success message
            } else {
                alert("Failed to update grade.");
            }
        })
        .catch(error => {
            console.error("Error updating grade:", error);
            alert("An error occurred. Please try again.");
        });
    };

    
    
    const handleConfirmAll = () => {
        const token = localStorage.getItem('token');
    
        // Filter out students whose grade is "Not Graded" or empty
        const validGrades = Object.keys(grades)
            .filter(registrationNo => grades[registrationNo] && grades[registrationNo] !== "Not Graded")
            .map(registrationNo => ({
                registrationNo,
                courseId: selectedCourse,
                grade: grades[registrationNo]
            }));
    
        if (validGrades.length === 0) {
            alert("No valid grades to confirm.");
            return;
        }
    
        fetch('http://localhost:4000/instructor/update_students_grades', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ grades: validGrades })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            setConfirmedGrades(prev => {
                const newConfirmed = { ...prev };
                validGrades.forEach(student => {
                    newConfirmed[student.registrationNo] = true;
                });
                return newConfirmed;
            });
        })
        .catch(error => console.error("Error confirming all grades:", error));
    };
    
    

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Grades Panel</h1>

            {/* Search Section */}
            <div className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
                <h2 className="text-xl mb-2">Search Students</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                        value={selectedDepartment}
                        onChange={(e) => {
                            setSelectedDepartment(e.target.value);
                            fetchCourses(e.target.value);
                        }}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept.departmentId} value={dept.departmentId}>{dept.name}</option>
                        ))}
                    </select>

                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.courseId} value={course.courseId}>{course.title}</option>
                        ))}
                    </select>

                    <button
                        onClick={fetchStudents}
                        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
                    >
                        Search
                    </button>

                    <button
                        onClick={handleConfirmAll}
                        className="bg-green-500 hover:bg-green-700 text-white p-2 rounded"
                    >
                        Confirm All
                    </button>
                </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-400">
                        <tr>
                            <th className="border p-2">Registration No</th>
                            <th className="border p-2">Course Title</th>
                            <th className="border p-2">Credits</th>
                            <th className="border p-2">Department</th>
                            <th className="border p-2">Grade</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr
                                key={student.registrationNo}
                                className={`${confirmedGrades[student.registrationNo] ? "bg-green-200" : "bg-gray-100 hover:bg-red-100"}`}
                            >
                                <td className="border p-2">{student.registrationNo}</td>
                                <td className="border p-2">{student.courseTitle}</td>
                                <td className="border p-2">{student.credits}</td>
                                <td className="border p-2">{student.departmentName}</td>
                                <td className="border p-2">
                                    <select
                                        value={grades[student.registrationNo] || ''}
                                        onChange={(e) => handleGradeChange(student.registrationNo, e.target.value)}
                                        className="border p-1 rounded w-full"
                                    >
                                        <option value="Not Graded">None</option>
                                        <option value="A+">A+</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                </td>
                                <td className="border p-2 flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleConfirm(student.registrationNo)}
                                        className="bg-blue-500 text-white p-1 rounded w-full md:w-auto transition-transform transform hover:scale-105"
                                    >
                                        Confirm
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

export default Grades;
