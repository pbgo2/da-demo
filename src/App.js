import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudentForm from "./pages/StudentForm";
import CourseForm from "./pages/CourseForm";
import EnrollmentForm from "./pages/EnrollmentForm";
import Predictor from "./pages/Predictor";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/students/new" element={user ? <StudentForm /> : <Navigate to="/login" />} />
          <Route path="/courses/new" element={user ? <CourseForm /> : <Navigate to="/login" />} />
          <Route path="/enrollments/new" element={user ? <EnrollmentForm /> : <Navigate to="/login" />} />
          <Route path="/predictor" element={user ? <Predictor /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
