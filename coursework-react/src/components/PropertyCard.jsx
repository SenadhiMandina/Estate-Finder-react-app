import React from "react";

function formatGBP(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "£0";
  return "£" + num.toLocaleString();
}

function cleanText(value) {
  return String(value || "").replace(/<br\s*\/?>/gi, " ").trim();
}

function PropertyCard({ property, isFavourite, onView, onFavourite, onDragStart }) {
  const img = property.picture || (property.images && property.images[0]) || "";
  const shortDesc = cleanText(property.description).slice(0, 160);

  return (
    <article
      className="propertyCard"
      draggable
      onDragStart={(e) => onDragStart(e, property)}
      aria-label={`Property ${property.id}`}
    >
      {img ? (
        <img className="cardImg" src={`/${img}`} alt={`${property.type} thumbnail`} />
      ) : (
        <div className="cardImg imgPlaceholder">
          No image
        </div>
      )}

      <div className="cardBody">
        <div className="cardTitle">
          <div>
            <span className="badge">{property.type}</span>
            <h3>{property.location}</h3>
          </div>

          <div className="price">{formatGBP(property.price)}</div>
        </div>

        <div className="metaRow">
          <span><b>{property.bedrooms}</b> beds</span>
          <span><b>{property.tenure}</b></span>
          <span>
            Added <b>{property.added?.month}</b> {property.added?.day}, {property.added?.year}
          </span>
        </div>

        <p className="desc">{shortDesc}{shortDesc.length >= 160 ? "…" : ""}</p>

        <div className="cardActions">
          <a className="btn btnPrimary" href={`#${property.id}`} onClick={(e) => { e.preventDefault(); onView(property); }}>View details</a>

          <button
            className="btn"
            onClick={() => onFavourite(property)}
            disabled={isFavourite}
            title={isFavourite ? "Already in favourites" : "Add to favourites"}
          >
            {isFavourite ? "Favourited ✅" : "❤️ Favourite"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
