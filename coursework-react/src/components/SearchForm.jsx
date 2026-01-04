import { useMemo, useState } from "react";

function parseDateOnly(value) {
  if (!value) return null;
  const [y, m, d] = String(value).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d); 
}

export default function SearchForm({ onSearch, postcodeAreas = [] }) {
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [postcode, setPostcode] = useState("");
  const [addedAfter, setAddedAfter] = useState("");
  const [addedBefore, setAddedBefore] = useState("");

  const uniquePostcodes = useMemo(() => {
    const set = new Set(
      (postcodeAreas || []).map((p) => String(p || "").trim()).filter(Boolean)
    );
    return Array.from(set).sort();
  }, [postcodeAreas]);

  function handleSubmit(e) {
    e.preventDefault();

    onSearch?.({
      type: type && type !== "Any" ? type : "",
      minPrice: minPrice !== "" ? Number(minPrice) : null,
      maxPrice: maxPrice !== "" ? Number(maxPrice) : null,
      minBeds: minBeds !== "" ? Number(minBeds) : null,
      maxBeds: maxBeds !== "" ? Number(maxBeds) : null,
      postcode: postcode ? String(postcode) : "",
      addedAfter: parseDateOnly(addedAfter),
      addedBefore: parseDateOnly(addedBefore),
    });
  }

  function handleReset() {
    setType("Any");
    setMinPrice("");
    setMaxPrice("");
    setMinBeds("");
    setMaxBeds("");
    setPostcode("");
    setAddedAfter("");
    setAddedBefore("");

    onSearch?.({});
  }

  return (
    <section className="widget card" aria-label="Search filters">
      <div className="widget__head">
        <h2 className="widget__title">Search Filters</h2>
        <p className="widget__sub">Choose any filters, then press Search.</p>
      </div>

      <form onSubmit={handleSubmit} className="widget__grid">
        <div className="field">
          <label className="field__label" htmlFor="type">
            Property type
          </label>
          <select
            id="type"
            className="field__control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="minPrice">
            Min price (£)
          </label>
          <input
            id="minPrice"
            className="field__control"
            type="number"
            inputMode="numeric"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 200000"
            min="0"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="maxPrice">
            Max price (£)
          </label>
          <input
            id="maxPrice"
            className="field__control"
            type="number"
            inputMode="numeric"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 750000"
            min="0"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="minBeds">
            Min bedrooms
          </label>
          <input
            id="minBeds"
            className="field__control"
            type="number"
            inputMode="numeric"
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value)}
            placeholder="e.g. 2"
            min="0"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="maxBeds">
            Max bedrooms
          </label>
          <input
            id="maxBeds"
            className="field__control"
            type="number"
            inputMode="numeric"
            value={maxBeds}
            onChange={(e) => setMaxBeds(e.target.value)}
            placeholder="e.g. 4"
            min="0"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="postcode">
            Location / postcode
          </label>
          <input
            id="postcode"
            className="field__control"
            list="postcodeAreas"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="e.g. BR5 / London / Manchester"
          />
          <datalist id="postcodeAreas">
            {uniquePostcodes.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="addedAfter">
            Added after
          </label>
          <input
            id="addedAfter"
            className="field__control"
            type="date"
            value={addedAfter}
            onChange={(e) => setAddedAfter(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="addedBefore">
            Added before
          </label>
          <input
            id="addedBefore"
            className="field__control"
            type="date"
            value={addedBefore}
            onChange={(e) => setAddedBefore(e.target.value)}
          />
        </div>

        <div className="field field--actions">
          <label className="field__label">Actions</label>
          <div className="btnRow">
            <button className="btn btn--primary" type="submit">
              Search
            </button>
            <button className="btn" type="button" onClick={handleReset}>
              Clear filters
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}