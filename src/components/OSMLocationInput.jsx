import { useState } from "react";

function OSMLocationInput({ value, onChange }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchLocation = async (query) => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
          query
        )}&email=lingaswamykommu95@gmail.com`
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("OSM search failed", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        className="form-control"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          searchLocation(e.target.value);
        }}
        placeholder="Search location"
      />

      {loading && (
        <div style={{ fontSize: "12px", marginTop: "4px", color: "#666" }}>
          Searching location...
        </div>
      )}

      {results.length > 0 && (
        <ul className="osm-results">
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => {
                onChange(place.display_name);
                setResults([]);
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OSMLocationInput;
