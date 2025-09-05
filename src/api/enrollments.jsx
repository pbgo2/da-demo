// export const saveEnrollment = async (enrollment) => {
//   const enrollments = JSON.parse(localStorage.getItem("enrollments") || "[]");
//   enrollments.push(enrollment);
//   localStorage.setItem("enrollments", JSON.stringify(enrollments));
//   return enrollment;
// };

// enrollments.js
export async function getEnrollments() {
  const res = await fetch("/api/enrollments");
  if (!res.ok) throw new Error("Failed to fetch enrollments");
  return res.json();
}

async function createEnrollment(enrollmentData) {
  const res = await fetch("/api/enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enrollmentData),
  });
  if (!res.ok) throw new Error("Failed to create enrollment");
  return res.json();
}

export { createEnrollment as saveEnrollment };
