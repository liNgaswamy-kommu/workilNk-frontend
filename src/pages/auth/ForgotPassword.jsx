import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";
import { formSuccess, formError } from "../../utils/alert";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      formError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(email);
      formSuccess("OTP sent to your email 📩");
      setTimeout(
        () => navigate("/reset-password", { state: { email } }),
        1200
      );
    } catch {
      formError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="with-navbar">
      <div className="auth-wrapper">
        <div className="auth-card form-card">
          <h3 className="auth-title">Forgot Password</h3>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

            <button className="btn btn-danger w-100" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
