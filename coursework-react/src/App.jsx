import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./components/SearchForm";

function App() {
  const [filteredProperties, setFilteredProperties] = useState(
    propertiesData.properties
  );

  function handleSearch(filters) {
    let results = propertiesData.properties;

    if (filters.type) {
      results = results.filter(
        (property) => property.type === filters.type
      );
    }

    if (filters.minPrice) {
      results = results.filter(
        (property) => property.price >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      results = results.filter(
        (property) => property.price <= Number(filters.maxPrice)
      );
    }
    setFilteredProperties(results);
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
        </div>
      ))}
    </div>
  );
}

export default App;