import { useState } from "react";

function SearchForm({ onSearch }) {
  const [type, setType] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ type });
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

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;