import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import defaultAvatar from "../../assets/default-avatar.png";
import { confirmLogout, formSuccess } from "../../utils/alert";
import "./Navbar.css";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    const confirmed = await confirmLogout();

    if (confirmed) {
      logout();
      formSuccess("Logged out 👋");

      setTimeout(() => {
        navigate("/");
      }, 800);
    }
  };

  return (
    <nav className="navbar navbar-dark px-3 app-navbar">
      {/* Logo */}
      <Link className="navbar-brand brand-logo" to="/">
        Worki<span className="highlight-dark">Lnk</span>
      </Link>

      {/* Right section */}
      <div className="ms-auto d-flex align-items-center gap-3">
        {!user ? (
          <>
            <Link className="btn btn-outline-danger" to="/login">
              Login
            </Link>
            <Link className="btn btn-danger" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-light btn-sm" to="/post-task">
              Post Task
            </Link>

            <Link className="btn btn-outline-light btn-sm" to="/tasks">
              View Tasks
            </Link>

            <img
              src={user.profilePic || defaultAvatar}
              alt="profile"
              onClick={() => navigate("/profile")}
              className="nav-avatar"
            />

            <button
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
