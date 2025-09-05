import React, { useEffect, useState } from "react";
import { saveEnrollment } from "../api/enrollments";

import {getStudents} from "../api/students";
import {getCourses} from "../api/courses";

function EnrollmentForm() {
  const [form, setForm] = useState({ studentId: "", courseId: "" });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const students = await getStudents();
      const courses = await getCourses();

      setStudents(students);
      setCourses(courses);

    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.studentId || !form.courseId) {
      alert("Please select both student and course");
      return;
    }
    await saveEnrollment(form);
    alert("Enrollment saved!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enroll Student</h2>

      <select name="" id=""
        onChange={(e) => setForm({ ...form, studentId: e.target.value })} >
          <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))
        }
      </select>

      <select name="" id=""
        onChange={(e) => setForm({ ...form, courseId: e.target.value })} >
          <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>{c.title}</option>
        ))}
      </select>

      <button type="submit">Enroll</button>
    </form>
  );
}

export default EnrollmentForm;
