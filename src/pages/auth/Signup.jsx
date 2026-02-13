import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";
import { formSuccess, formError } from "../../utils/alert";
import { isValidEmail, isValidPhone } from "../../utils/validators";
import "./Auth.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    if (name === "password" || name === "confirmPassword") {
      if (!updated.confirmPassword) setPasswordMatch(null);
      else setPasswordMatch(updated.password === updated.confirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      formError("Enter a valid email");
      return;
    }

    if (!isValidPhone(form.phone)) {
      formError("Mobile number must be exactly 10 digits");
      return;
    }

    if (form.password !== form.confirmPassword) {
      formError("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword: _, ...payload } = form;
      await signupUser(payload);
      formSuccess("Account created successfully 🎉");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      formError(err.message || "Signup failed");
    }
  };

  return (
    <div className="with-navbar">
      <div className="auth-wrapper">
        <div className="auth-card form-card">
          <h3 className="auth-title">Signup</h3>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              className="form-control mb-3"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              className="form-control mb-3"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="input-group mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className="input-group-text password-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
              </span>
            </div>

            <div className="input-group mb-3 position-relative">
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${
                  passwordMatch === true
                    ? "is-valid"
                    : passwordMatch === false
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordMatch !== null && (
                <span className="password-status-icon">
                  {passwordMatch ? "✓" : "✕"}
                </span>
              )}
            </div>

            <input
              name="phone"
              className="form-control mb-4"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <button className="btn btn-danger w-100">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
