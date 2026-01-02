import { useState } from "react";
import { DropdownList, NumberPicker, DatePicker, Combobox } from "react-widgets";

function SearchForm({ onSearch }) {
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [location, setLocation] = useState("");

  const [addedAfter, setAddedAfter] = useState(null);
  const [addedBefore, setAddedBefore] = useState(null);

  const propertyTypes = ["Any", "House", "Flat"];

  function handleSubmit(e) {
    e.preventDefault();

    onSearch({
      type: type === "Any" ? "" : type,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      location,
      addedAfter,
      addedBefore
    });
  }

  function handleClear() {
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setMinBeds("");
    setMaxBeds("");
    setLocation("");
    setAddedAfter(null);
    setAddedBefore(null);
    onSearch({});
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
      <div style={{ display: "grid", gap: "12px" }}>
        <label>
          Property Type:
          <DropdownList
            data={propertyTypes}
            value={type === "" ? "Any" : type}
            onChange={(value) => setType(value === "Any" ? "" : value)}
          />
        </label>

        <label>
          Min Price:
          <NumberPicker
            value={minPrice === "" ? null : Number(minPrice)}
            onChange={(value) => setMinPrice(value == null ? "" : String(value))}
            min={0}
            step={1000}
          />
        </label>

        <label>
          Max Price:
          <NumberPicker
            value={maxPrice === "" ? null : Number(maxPrice)}
            onChange={(value) => setMaxPrice(value == null ? "" : String(value))}
            min={0}
            step={1000}
          />
        </label>

        <label>
          Min Bedrooms:
          <NumberPicker
            value={minBeds === "" ? null : Number(minBeds)}
            onChange={(value) => setMinBeds(value == null ? "" : String(value))}
            min={0}
            step={1}
          />
        </label>

        <label>
          Max Bedrooms:
          <NumberPicker
            value={maxBeds === "" ? null : Number(maxBeds)}
            onChange={(value) => setMaxBeds(value == null ? "" : String(value))}
            min={0}
            step={1}
          />
        </label>

        <label>
          Location/Postcode:
          <Combobox
            value={location}
            onChange={(value) => setLocation(value || "")}
            placeholder="Type a location..."
          />
        </label>

        <label>
          Added After:
          <DatePicker value={addedAfter} onChange={setAddedAfter} />
        </label>

        <label>
          Added Before:
          <DatePicker value={addedBefore} onChange={setAddedBefore} />
        </label>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btnPrimary" type="submit">Search</button>
          <button className="btnDanger" type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;