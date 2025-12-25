function PropertyDetails({ property, onBack }) {
  if (!property) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: "16px" }}>
      <button onClick={onBack} style={{ marginBottom: "12px" }}>
        Back to Results
      </button>

      <h2>{property.type}</h2>
      <p>Location: {property.location}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Price: £{property.price}</p>
      <p>Tenure: {property.tenure}</p>

      <h3>Description</h3>
      <p>{property.description}</p>

      <h3>Image</h3>
      {property.picture ? (
        <img
          src={property.picture}
          alt={property.type}
          style={{ width: "100%", maxWidth: "500px" }}
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}

export default PropertyDetails;