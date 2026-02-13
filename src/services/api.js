export const BACKEND_URL = "http://localhost:8080";

export async function apiRequest(url, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const res = await fetch(BACKEND_URL + url, {
    method,
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : null
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return res.json();
  }

  return null;
}
