import React, { useState } from "react";
import {saveCourse}  from "../api/courses";


function CourseForm() {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveCourse(form);
    alert("Course saved!");
    setForm({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Course</h2>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default CourseForm;
