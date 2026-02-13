import Select from "react-select";

const distanceOptions = [
  { value: "1", label: "Within 1 km" },
  { value: "5", label: "Within 5 km" },
  { value: "10", label: "Within 10 km" }
];

const workOptionsoptions = [
  { value: "cleaning", label: "House Cleaning" },
  { value: "delivery", label: "Delivery" },
  { value: "carwash", label: "Car Wash" },
  { value: "electrician", label: "Electrician" },
  { value: "plumbing", label: "Plumbing" }
];

const selectStyles = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    minHeight: "36px",
    background: "transparent"
  }),
  menuPortal: (base) => ({ ...base, zIndex: 99999 })
};

const SearchSection = () => {
  return (
    <section className="search-section">
      <h1 className="search-title">
        Find help for any task, near you
      </h1>

      <div className="search-pill">
        <input className="pill-input" placeholder="Location" />

        <div className="pill-divider" />

        <Select
          options={distanceOptions}
          placeholder="Distance"
          className="pill-select"
          classNamePrefix="rs"
          isSearchable={false}
          menuPortalTarget={document.body}
          styles={selectStyles}
        />

        <div className="pill-divider" />

        <Select
          options={workOptionsoptions}
          placeholder="Type of work"
          className="pill-select"
          classNamePrefix="rs"
          menuPortalTarget={document.body}
          styles={selectStyles}
        />

        <div className="pill-divider" />

        <div className="pill-price">
          <span className="rupee">₹</span>
          <input type="number" placeholder="Max price" />
        </div>

        <button className="pill-search-btn">Search</button>
      </div>
    </section>
  );
};

export default SearchSection;
