import React, { useState } from "react";
import { saveStudent } from "../api/students";

function StudentForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveStudent(form);
    alert("Student saved!");
    setForm({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default StudentForm;
