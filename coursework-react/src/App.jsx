import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./components/PropertyDetails";

function App() {
  const [filteredProperties, setFilteredProperties] = useState(
    propertiesData.properties
  );

  const [selectedProperty, setSelectedProperty] = useState(null);

  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  function handleSearch(filters) {
    let results = propertiesData.properties;

    if (filters.type) {
      results = results.filter((p) => p.type === filters.type);
    }

    if (filters.minPrice) {
      results = results.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      results = results.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.minBeds) {
      results = results.filter((p) => p.bedrooms >= Number(filters.minBeds));
    }

    if (filters.maxBeds) {
      results = results.filter((p) => p.bedrooms <= Number(filters.maxBeds));
    }

    if (filters.location) {
      results = results.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredProperties(results);
  }

  function handleBack() {
    setSelectedProperty(null);
  }

  function addToFavourites(property) {
    const exists = favourites.some((fav) => fav.id === property.id);
    if (!exists) {
      setFavourites([...favourites, property]);
    }
  }

  function removeFromFavourites(id) {
    setFavourites(favourites.filter((p) => p.id !== id));
  }

  if (selectedProperty) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Estate App</h1>

        <button onClick={() => setShowFavourites(true)}>
          View Favourites ({favourites.length})
        </button>

        <PropertyDetails property={selectedProperty} onBack={handleBack} />
      </div>
    );
  }

  if (showFavourites) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Favourites</h1>

        <button onClick={() => setShowFavourites(false)}>Back to Search</button>

        <p>Total favourites: {favourites.length}</p>

        {favourites.length === 0 ? (
          <p>No favourites saved yet.</p>
        ) : (
          favourites.map((property) => (
            <div
              key={property.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "12px"
              }}
            >
              <h2>{property.type}</h2>

              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                £{property.price.toLocaleString()}
              </p>

              <p>
                <strong>Bedrooms:</strong> {property.bedrooms} |{" "}
                <strong>Tenure:</strong> {property.tenure}
              </p>

              <p>
                <strong>Location:</strong> {property.location}
              </p>

              <p>
                <strong>Added:</strong> {property.added.month}{" "}
                {property.added.day}, {property.added.year}
              </p>

              <p>
                {property.description
                  .replace(/<br\s*\/?>/gi, " ")
                  .slice(0, 160)}
                ...
              </p>

              <button onClick={() => removeFromFavourites(property.id)}>
                Remove
              </button>

              <button
                onClick={() => {
                  setSelectedProperty(property);
                  setShowFavourites(false);
                }}
                style={{ marginLeft: "10px" }}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Estate App</h1>

      <button onClick={() => setShowFavourites(true)}>
        View Favourites ({favourites.length})
      </button>

      <SearchForm onSearch={handleSearch} />

      {filteredProperties.map((property) => {
        const isFav = favourites.some((fav) => fav.id === property.id);

        return (
          <div
            key={property.id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "12px"
            }}
          >
            <h2>{property.type}</h2>

            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              £{property.price.toLocaleString()}
            </p>

            <p>
              <strong>Bedrooms:</strong> {property.bedrooms} |{" "}
              <strong>Tenure:</strong> {property.tenure}
            </p>

            <p>
              <strong>Location:</strong> {property.location}
            </p>

            <p>
              <strong>Added:</strong> {property.added.month} {property.added.day}
              , {property.added.year}
            </p>

            <p>
              {property.description
                .replace(/<br\s*\/?>/gi, " ")
                .slice(0, 160)}
              ...
            </p>

            <button onClick={() => setSelectedProperty(property)}>
              View Details
            </button>

            <button
              onClick={() => addToFavourites(property)}
              style={{ marginLeft: "10px" }}
              disabled={isFav}
            >
              {isFav ? "Favourited ✅" : "❤️ Favourite"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;