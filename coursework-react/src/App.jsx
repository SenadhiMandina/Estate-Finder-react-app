import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./components/PropertyDetails";

function App() {
  const allProperties = propertiesData.properties;

  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  function handleSearch(filters) {
    let results = allProperties;

    if (filters.type) results = results.filter((p) => p.type === filters.type);
    if (filters.minPrice) results = results.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) results = results.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.minBeds) results = results.filter((p) => p.bedrooms >= Number(filters.minBeds));
    if (filters.maxBeds) results = results.filter((p) => p.bedrooms <= Number(filters.maxBeds));

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
    if (!exists) setFavourites([...favourites, property]);
  }

  function removeFromFavourites(id) {
    setFavourites(favourites.filter((p) => p.id !== id));
  }

  function clearFavourites() {
    setFavourites([]);
  }

  function onDragStartResult(e, property) {
    e.dataTransfer.setData("text/propertyId", property.id);
  }

  function onDropAddToFavourites(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/propertyId");
    if (!id) return;

    const prop = allProperties.find((p) => p.id === id);
    if (prop) addToFavourites(prop);
  }

  function onDragStartFavourite(e, property) {
    e.dataTransfer.setData("text/favouriteId", property.id);
  }

  function onDropRemoveFavourite(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/favouriteId");
    if (!id) return;
    removeFromFavourites(id);
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

        <button
          onClick={clearFavourites}
          disabled={favourites.length === 0}
          style={{ marginLeft: "10px" }}
        >
          Clear all
        </button>

        <p>Total favourites: {favourites.length}</p>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropRemoveFavourite}
          style={{
            border: "2px dashed #999",
            padding: "12px",
            marginBottom: "12px"
          }}
        >
          🗑️ Drag a favourite here to remove
        </div>

        {favourites.length === 0 ? (
          <p>No favourites saved yet.</p>
        ) : (
          favourites.map((property) => (
            <div
              key={property.id}
              draggable
              onDragStart={(e) => onDragStartFavourite(e, property)}
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
                <strong>Added:</strong> {property.added.month} {property.added.day},{" "}
                {property.added.year}
              </p>

              <p>
                {property.description.replace(/<br\s*\/?>/gi, " ").slice(0, 160)}...
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
    <div style={{ padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <div style={{ flex: 2 }}>
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
              draggable
              onDragStart={(e) => onDragStartResult(e, property)}
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
                <strong>Added:</strong> {property.added.month} {property.added.day},{" "}
                {property.added.year}
              </p>

              <p>
                {property.description.replace(/<br\s*\/?>/gi, " ").slice(0, 160)}...
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

      <div style={{ flex: 1 }}>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropAddToFavourites}
          style={{
            border: "1px solid #ccc",
            padding: "12px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0 }}>Favourites ({favourites.length})</h2>

            <button
              onClick={clearFavourites}
              disabled={favourites.length === 0}
            >
              Clear all
            </button>
          </div>

          <p style={{ opacity: 0.85 }}>
            Drag a result card here to add to favourites.
          </p>

          {favourites.length === 0 ? (
            <p>No favourites yet.</p>
          ) : (
            favourites.map((p) => (
              <div
                key={p.id}
                draggable
                onDragStart={(e) => onDragStartFavourite(e, p)}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px"
                }}
              >
                <strong>{p.type}</strong>
                <div style={{ fontSize: "14px", opacity: 0.9 }}>{p.location}</div>

                <div style={{ marginTop: "8px" }}>
                  <button onClick={() => setSelectedProperty(p)}>
                    View
                  </button>

                  <button
                    onClick={() => removeFromFavourites(p.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropRemoveFavourite}
            style={{
              marginTop: "12px",
              padding: "12px",
              border: "2px dashed #999",
              textAlign: "center"
            }}
          >
            🗑️ Drag a favourite here to remove
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;