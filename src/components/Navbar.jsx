import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      {user && (
        <>
          <div>
            Welcome, {user.name}!
          </div>
          <br />
          <Link to="/">Dashboard</Link>
          <Link to="/students/new">Add Student</Link>
          <Link to="/courses/new">Add Course</Link>
          <Link to="/enrollments/new">Enroll Student</Link>
          <Link to="/predictor">Predictor</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
