// auth.js
export async function registerUser(userData) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
}

export async function loginUser(userData) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();

  if (data.error){
    return new Error(data.error || "Failed to login");
  }
  return data;
}
