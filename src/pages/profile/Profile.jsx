import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import { apiRequest, BACKEND_URL } from "../../services/api";
import defaultAvatar from "../../assets/default-avatar.png";
import { toastSuccess, toastError } from "../../utils/alert";
import "../../styles/layout.css";
import "../auth/Auth.css";
import "./Profile.css";

function Profile() {
  const { user, setUser } = useAuth();

  const fileRef = useRef(null);
  const menuRef = useRef(null);
  const photoRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    address: user?.address || ""
  });

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        photoRef.current &&
        !photoRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (!user) return null;

  /* ================= PHOTO UPLOAD ================= */

  const uploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fd = new FormData();
      fd.append("file", file);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${BACKEND_URL}/api/users/me/profile-pic`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd
        }
      );

      const path = await res.text();

      setUser((prev) => ({
        ...prev,
        profilePic: `${BACKEND_URL}${path}?t=${Date.now()}`
      }));

      toastSuccess("Profile photo updated 📸");
      setShowMenu(false);
    } catch {
      toastError("Failed to upload photo");
    }
  };

  const removePhoto = async () => {
    try {
      await apiRequest("/api/users/me/profile-pic", "DELETE");
      setUser((prev) => ({ ...prev, profilePic: null }));
      toastSuccess("Profile photo removed 🗑️");
      setShowMenu(false);
    } catch {
      toastError("Failed to remove photo");
    }
  };

  /* ================= SAVE PROFILE ================= */

  const saveProfile = async () => {
    try {
      const updated = await apiRequest("/api/users/me", "PUT", form);

      setUser((prev) => ({
        ...prev,
        ...updated,
        profilePic: updated.profilePic
          ? `${BACKEND_URL}${updated.profilePic}?t=${Date.now()}`
          : prev.profilePic
      }));

      toastSuccess("Profile updated successfully ✅");
    } catch {
      toastError("Failed to update profile");
    }
  };

  return (
    <div className="with-navbar">
    <div className="page-center">
      <div className="auth-card profile-card p-4 position-relative">
          {/* Avatar */}
          <div className="text-center mb-4 position-relative">
            <img
              ref={photoRef}
              src={user.profilePic || defaultAvatar}
              alt="profile"
              onClick={() => setShowMenu((p) => !p)}
              className="profile-avatar"
            />

            {showMenu && (
              <div ref={menuRef} className="profile-menu">
                {user.profilePic && (
                  <div
                    onClick={() =>
                      window.open(user.profilePic, "_blank")
                    }
                  >
                    View Photo
                  </div>
                )}
                <div onClick={() => fileRef.current?.click()}>
                  Change Photo
                </div>
                {user.profilePic && (
                  <div
                    className="text-danger"
                    onClick={removePhoto}
                  >
                    Remove Photo
                  </div>
                )}
              </div>
            )}

            <input
              type="file"
              hidden
              ref={fileRef}
              accept="image/*"
              onChange={uploadPhoto}
            />
          </div>

          {/* FORM */}
          <label>Name</label>
          <input
            className="form-control mb-2"
            value={form.name}
            onChange={(e) =>
              setForm((p) => ({ ...p, name: e.target.value }))
            }
          />

          <label>Email</label>
          <input
            className="form-control mb-2"
            value={user.email}
            disabled
          />

          <label>Phone</label>
          <input
            className="form-control mb-2"
            value={form.phone}
            onChange={(e) =>
              setForm((p) => ({ ...p, phone: e.target.value }))
            }
          />

          <label>Bio</label>
          <textarea
            className="form-control mb-2"
            rows="2"
            value={form.bio}
            onChange={(e) =>
              setForm((p) => ({ ...p, bio: e.target.value }))
            }
          />

          <label>Address</label>
          <textarea
            className="form-control mb-3"
            rows="2"
            value={form.address}
            onChange={(e) =>
              setForm((p) => ({ ...p, address: e.target.value }))
            }
          />

          <button
            className="btn btn-danger w-100"
            onClick={saveProfile}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
