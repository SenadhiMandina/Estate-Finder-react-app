import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./components/PropertyDetails";

function App() {
  const [filteredProperties, setFilteredProperties] = useState(
    propertiesData.properties
  );

  const [selectedProperty, setSelectedProperty] = useState(null);

  function handleSearch(filters) {
    let results = propertiesData.properties;

    if (filters.type) {
      results = results.filter((p) => p.type === filters.type);
    }

    if (filters.minPrice) {
      results = results.filter(
        (p) => p.price >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      results = results.filter(
        (p) => p.price <= Number(filters.maxPrice)
      );
    }

    if (filters.minBeds) {
      results = results.filter(
        (p) => p.bedrooms >= Number(filters.minBeds)
      );
    }

    if (filters.maxBeds) {
      results = results.filter(
        (p) => p.bedrooms <= Number(filters.maxBeds)
      );
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

  if (selectedProperty) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Estate App</h1>
        <PropertyDetails
          property={selectedProperty}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Estate App</h1>

      <SearchForm onSearch={handleSearch} />

      {filteredProperties.map((property) => (
        <div
          key={property.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px"
          }}
        >
          <h2>{property.type}</h2>
          <p>Location: {property.location}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Price: £{property.price}</p>

          <button onClick={() => setSelectedProperty(property)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;