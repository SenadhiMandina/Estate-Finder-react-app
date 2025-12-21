import propertiesData from "./data/properties.json";
function App() {
  const properties = propertiesData.properties;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Estate App</h1>

      {properties.map((property) => (
        <div
          key={property.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px"
          }}
        >
          <h2>{property.type}</h2>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Price:</strong> £{property.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;