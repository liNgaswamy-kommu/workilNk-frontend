// src/services/authService.js

import { BACKEND_URL } from "./api";

/* ================= LOGIN ================= */
export async function loginUser(data) {
  const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

/* ================= SIGNUP ================= */
export async function signupUser(data) {
  const res = await fetch(`${BACKEND_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    let errorMessage = "Signup failed";

    try {
      const errJson = await res.json();
      errorMessage = errJson.message || errorMessage;
    } catch {
      const text = await res.text();
      if (text) errorMessage = text;
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

/* ================= FORGOT PASSWORD ================= */
export async function forgotPassword(email) {
  const res = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed");
  }

  return res.text();
}

/* ================= RESET PASSWORD ================= */
export async function resetPassword(data) {
  const res = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return text;
}
