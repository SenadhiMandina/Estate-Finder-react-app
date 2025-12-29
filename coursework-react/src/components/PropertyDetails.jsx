import { useState } from "react";

function PropertyDetails({ property, onBack }) {
  const allImages =
    property.images && property.images.length > 0
      ? property.images
      : property.picture
      ? [property.picture]
      : [];

  const [selectedImage, setSelectedImage] = useState(allImages[0] || "");
  const [showAll, setShowAll] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack}>← Back</button>

      <h2 style={{ marginTop: "12px" }}>
        {property.type} — £{property.price.toLocaleString()}
      </h2>

      <p>
        <strong>Location:</strong> {property.location}
      </p>

      <p>
        <strong>Bedrooms:</strong> {property.bedrooms} |{" "}
        <strong>Tenure:</strong> {property.tenure}
      </p>

      <p>
        <strong>Added:</strong> {property.added.month} {property.added.day},{" "}
        {property.added.year}
      </p>

      {selectedImage && (
        <div style={{ marginTop: "16px" }}>

          <img
            src={`/${selectedImage}`}
            alt="Main property"
            style={{
              width: "100%",
              maxWidth: "750px",
              height: "380px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "1px solid #ccc",
              display: "block"
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "12px"
            }}
          >
            {allImages.map((img, index) => (
              <img
                key={index}
                src={`/${img}`}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: "90px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border:
                    selectedImage === img
                      ? "3px solid #00bcd4"
                      : "1px solid #aaa"
                }}
              />
            ))}
          </div>

          <button style={{ marginTop: "12px" }} onClick={() => setShowAll(true)}>
            View all images
          </button>

          {showAll && (
            <div
              onClick={() => setShowAll(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.75)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                zIndex: 9999
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#fff",
                  padding: "16px",
                  borderRadius: "12px",
                  width: "100%",
                  maxWidth: "900px",
                  maxHeight: "80vh",
                  overflow: "auto"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <h3 style={{ margin: 0 }}>All images</h3>
                  <button onClick={() => setShowAll(false)}>Close</button>
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "10px"
                  }}
                >
                  {allImages.map((img, i) => (
                    <img
                      key={i}
                      src={`/${img}`}
                      alt={`Image ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "10px"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <p style={{ marginTop: "16px", lineHeight: "1.6" }}>
        {String(property.description || "").replace(/<br\s*\/?>/gi, " ")}
      </p>
    </div>
  );
}

export default PropertyDetails;