import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./components/PropertyDetails";
import "./App.css";

function App() {
  const allProperties = propertiesData.properties;

  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [favourites, setFavourites] = useState([]);

  function handleSearch(filters) {
    let results = allProperties;

    if (filters.type) results = results.filter((p) => p.type === filters.type);

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

    if (filters.addedAfter || filters.addedBefore) {
      results = results.filter((p) => {
        const addedDate = new Date(
          `${p.added.month} ${p.added.day}, ${p.added.year}`
        );

        if (filters.addedAfter && addedDate < filters.addedAfter) return false;
        if (filters.addedBefore && addedDate > filters.addedBefore) return false;

        return true;
      });
    }

    setFilteredProperties(results);
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
      <div className="page">
        <div className="leftCol">
          <h1 className="h1">Estate App</h1>
          <div className="panel">
            <PropertyDetails
              property={selectedProperty}
              onBack={() => setSelectedProperty(null)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="leftCol">
        <h1 className="h1">Estate App</h1>

        <div className="panel">
          <h2 className="h2">Search</h2>
          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="panel">
          <h2 className="h2">Results ({filteredProperties.length})</h2>

          {filteredProperties.map((property) => {
            const isFav = favourites.some((fav) => fav.id === property.id);

            return (
              <div
                key={property.id}
                className="item"
                draggable
                onDragStart={(e) => onDragStartResult(e, property)}
              >
                <div className="itemTop">
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>
                      {property.type}
                    </div>
                    <div className="meta">{property.location}</div>
                  </div>

                  <div className="price">
                    £{property.price.toLocaleString()}
                  </div>
                </div>

                <div className="meta" style={{ marginTop: 6 }}>
                  <b>Bedrooms:</b> {property.bedrooms} &nbsp;|&nbsp;{" "}
                  <b>Tenure:</b> {property.tenure} &nbsp;|&nbsp; <b>Added:</b>{" "}
                  {property.added.month} {property.added.day}, {property.added.year}
                </div>

                <p className="desc">
                  {String(property.description || "")
                    .replace(/<br\s*\/?>/gi, " ")
                    .slice(0, 160)}
                  ...
                </p>

                <div className="btnRow">
                  <button
                    className="btnPrimary"
                    onClick={() => setSelectedProperty(property)}
                  >
                    View Details
                  </button>

                  <button
                    className="btnPrimary"
                    onClick={() => addToFavourites(property)}
                    disabled={isFav}
                    style={{ opacity: isFav ? 0.7 : 1 }}
                  >
                    {isFav ? "Favourited ✅" : "❤️ Favourite"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rightCol">
        <div
          className="panel"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropAddToFavourites}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <h2 className="h2" style={{ margin: 0 }}>
              Favourites ({favourites.length})
            </h2>

            <button
              className="btnDanger"
              onClick={clearFavourites}
              disabled={favourites.length === 0}
            >
              Clear all
            </button>
          </div>

          <p className="dropHint">Drag a result card here to add.</p>

          {favourites.length === 0 ? (
            <p className="dropHint">No favourites yet.</p>
          ) : (
            favourites.map((p) => (
              <div
                key={p.id}
                className="item"
                draggable
                onDragStart={(e) => onDragStartFavourite(e, p)}
              >
                <div style={{ fontWeight: 800 }}>{p.type}</div>
                <div className="meta">{p.location}</div>

                <div className="btnRow">
                  <button
                    className="btnPrimary"
                    onClick={() => setSelectedProperty(p)}
                  >
                    View
                  </button>

                  <button
                    className="btnDanger"
                    onClick={() => removeFromFavourites(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          <div
            className="removeZone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropRemoveFavourite}
          >
            🗑️ Drag a favourite here to remove
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;