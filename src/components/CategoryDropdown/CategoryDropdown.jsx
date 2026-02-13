import { useEffect, useRef, useState } from "react";
import "./CategoryDropdown.css";

const categories = [
  "Cleaning",
  "Household Work",
  "Delivery",
  "Moving / Shifting",
  "Electrical",
  "Plumbing",
  "Car / Bike Wash",
  "Repair & Maintenance",
  "Painting",
  "Gardening",
  "Cooking",
  "OTHERS"
];

function CategoryDropdown({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-box ${open ? "open" : ""} ${
          error ? "error" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <span className={!value ? "placeholder" : ""}>
          {value || "Select category"}
        </span>
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="dropdown-menu-custom">
          {categories.map((cat) => (
            <div
              key={cat}
              className={`dropdown-item ${
                value === cat ? "selected" : ""
              }`}
              onClick={() => {
                onChange(cat);
                setOpen(false);
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;
