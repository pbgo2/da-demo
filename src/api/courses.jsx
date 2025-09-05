// export const saveCourse = async (course) => {
//   const courses = JSON.parse(localStorage.getItem("courses") || "[]");
//   courses.push(course);
//   localStorage.setItem("courses", JSON.stringify(courses));
//   return course;
// };

// courses.js
// courses.js
export async function getCourses() {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

async function createCourse(courseData) {
  const res = await fetch("/api/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
}
export { createCourse as saveCourse };