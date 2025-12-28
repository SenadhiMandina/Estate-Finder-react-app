import { useState } from "react";

function SearchForm({ onSearch }) {
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({
      type,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      location
    });
  }

  function handleClear() {
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setMinBeds("");
    setMaxBeds("");
    setLocation("");
    onSearch({});
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <label>
        Property Type:{" "}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </label>

      <br /><br />

      <label>
        Min Price:{" "}
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        Max Price:{" "}
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        Min Bedrooms:{" "}
        <input
          type="number"
          value={minBeds}
          onChange={(e) => setMinBeds(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        Max Bedrooms:{" "}
        <input
          type="number"
          value={maxBeds}
          onChange={(e) => setMaxBeds(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        Location/Postcode:{" "}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>

      <br /><br />

      <button type="submit">Search</button>

      <button
        type="button"
        onClick={handleClear}
        style={{ marginLeft: "10px" }}
      >
        Clear
      </button>
    </form>
  );
}

export default SearchForm;