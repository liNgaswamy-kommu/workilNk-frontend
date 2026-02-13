import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiRequest, BACKEND_URL } from "../services/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    apiRequest("/api/users/me")
      .then((data) => {
        setUser({
          ...data,
          profilePic: data.profilePic
            ? BACKEND_URL + data.profilePic
            : null
        });
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        Promise.resolve().then(() => setLoading(false));
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
