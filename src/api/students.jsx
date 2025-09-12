// export const saveStudent = async (student) => {
//   const students = JSON.parse(localStorage.getItem("students") || "[]");
//   students.push(student);
//   localStorage.setItem("students", JSON.stringify(students));
//   return student;
// };

// students.js
export async function getStudents() {
  const res = await fetch("/api/students");
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

async function createStudent(studentData) {
  const res = await fetch("/api/student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) throw new Error("Failed to create student");
  return res.json();
}


export { createStudent as saveStudent };
