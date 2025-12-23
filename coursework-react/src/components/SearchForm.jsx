import { useState } from "react";

function SearchForm({ onSearch }) {
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); 
    onSearch({
      type: type,
      minPrice: minPrice,
      maxPrice: maxPrice
    });
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

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;