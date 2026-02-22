import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Routes, Route } from "react-router-dom";
import OpenRoute from "./routes/OpenRoute";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NavBar from "./components/NavBar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./components/Settings";
import Enrolled from "./components/Dashboard/Enrolled";
import Cart from "./components/Dashboard/Cart/Cart";
import AddCourse from "./components/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/Dashboard/MyCourses";
import EditCourse from "./components/Dashboard/EditCourse/EditCourse";
import Instuctor from "./components/Dashboard/InstructorDashboard/Instuctor";
import { useSelector } from "react-redux";



function App() {
  const {user} = useSelector(state=>state.profile)

  return (
    <div className="w-screen min-h-screen bg-gray-800 flex flex-col ">
      <NavBar />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/forgot-password"

            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route 
          path="/reset-password/:id" 
          element={
            <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
          
          } />
          <Route path="/verify-email" element={<VerifyEmail />} /> 

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            }
          >
            <Route path="profile" element={<MyProfile />} />
            <Route path="settings" element={<Settings />} />

            {
              user?.accountType === "Student" && 
                  <>
                    <Route path="enrolled-courses" element={<Enrolled />} />
                    <Route path="cart" element={<Cart />} />
                  </>

            }
            {
              user?.accountType === "Instructor" && 
                  <>
                    <Route path="add-course" element={<AddCourse />} />
                    <Route path="instructor" element={<Instuctor />} />
                    <Route path="my-courses" element={<MyCourses/>} />
                    <Route path="edit-course/:courseId" element={<EditCourse/>} />
                  </>

            }
          </Route>
        </Routes>

      </div>
    </div>

  )
}

export default App
