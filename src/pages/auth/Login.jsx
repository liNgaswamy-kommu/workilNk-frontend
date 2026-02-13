import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { apiRequest, BACKEND_URL } from "../../services/api";
import { useAuth } from "../../context/useAuth";
import { formSuccess, formError } from "../../utils/alert";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.token);

      const userData = await apiRequest("/api/users/me");
      setUser({
        ...userData,
        profilePic: userData.profilePic
          ? BACKEND_URL + userData.profilePic
          : null,
      });

      formSuccess("Login successful 🎉");
      setTimeout(() => navigate("/"), 1200);
    } catch {
      formError("Invalid email or password");
    }
  };

  return (
    <div className="with-navbar">
      <div className="auth-wrapper">
        <div className="auth-card form-card">
          <h3 className="auth-title">Login</h3>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="input-group mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="input-group-text password-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
              </span>
            </div>

            <div className="text-end mb-3">
              <span
                style={{ cursor: "pointer", color: "#ff2d2d", fontSize: 13 }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </span>
            </div>

            <button className="btn btn-danger w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
