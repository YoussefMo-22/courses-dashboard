// src/App.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import CourseForm from './pages/CourseForm/CourseForm';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import Courses from './pages/Courses/Courses';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Navbar from './Components/Layout/Navbar/Navbar';
import Footer from './Components/Layout/Footer/Footer';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import './App.css';

function AppRoutes() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {loggedInUser ? (
          <>
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/add" element={<CourseForm />} />
            <Route path="/courses/edit/:id" element={<CourseForm />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      <Footer />
      <ToastContainer />  {/* Add the ToastContainer component here */}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
