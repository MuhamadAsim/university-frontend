import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import App from './App.jsx'
import Profile from './Components/Profile.jsx'
import Login from './Components/Login.jsx'
import Helpline from './Components/Helpline.jsx'
import Courses from './Components/Courses.jsx'
import DMC from './Components/DMC.jsx'
import Dues from './Components/Dues.jsx'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import CoursesPage from './Components/Admin/EditCourses.jsx'
import DepartmentsPage from './Components/Admin/Departments.jsx'
import InstructorsPage from './Components/Admin/Instructors.jsx'
import StudentPage from './Components/Admin/Students.jsx'
import AdminDashboard from './Components/Admin/DashBoard.jsx'
import InstructorsDashboard from './Components/Instructor/instructor.jsx'
import InstructorCourses from './Components/Instructor/instructor_courses.jsx'
import Grades from './Components/Instructor/grades.jsx'
import StudentResults from './Components/Instructor/results.jsx'


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      {/* Admin routes */}
      <Route path='/about' element={<About />} />
      <Route path='/dashboard' element={<AdminDashboard />} />
      <Route path='/edit_student' element={<StudentPage />} />
      <Route path='/edit_instructor' element={<InstructorsPage />} />
      <Route path='/edit_department' element={<DepartmentsPage />} />
      <Route path='/edit_courses' element={<CoursesPage />} />
      {/* Student routes */}
      <Route path='/profile' element={<Profile />} />
      <Route path='/dmc' element={<DMC/>} />
      <Route path='/helpline' element={<Helpline />} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/dues' element={<Dues />} />
      {/* Instructor routes */}
      <Route path='/instructor' element={<InstructorsDashboard />} />
      <Route path='/current_courses' element={<InstructorCourses/>} />
      <Route path='/edit_grades' element={<Grades/>} />
      <Route path='/results' element={<StudentResults/>} />

      <Route path='/login' element={<Login />} />

    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
)
