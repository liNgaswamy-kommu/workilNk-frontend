import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { formSuccess, formError } from "../../utils/alert";
import "./Auth.css";

const OTP_EXPIRY_SECONDS = 10 * 60;

function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);

  useEffect(() => {
    if (!email || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, email]);

  const passwordsMatch = confirmPassword && password === confirmPassword;

  const handleReset = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      formError("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ email, otp, newPassword: password });
      formSuccess("Password reset successful 🔐");
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      formError("Invalid or expired OTP");
    }
  };

  if (!email) return null;

  return (
    <div className="with-navbar">
      <div className="auth-wrapper">
        <div className="auth-card form-card">
          <h3 className="auth-title">Reset Password</h3>

          <form onSubmit={handleReset}>
            <input
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <div className="input-group mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="New Password"
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

            <input
              type="password"
              className={`form-control mb-4 ${
                confirmPassword && !passwordsMatch
                  ? "border-danger"
                  : passwordsMatch
                  ? "border-success"
                  : ""
              }`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              className="btn btn-danger w-100"
              disabled={!otp || !passwordsMatch}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
