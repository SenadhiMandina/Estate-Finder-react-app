import React, { useMemo } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ImageGallery from "./ImageGallery";

function formatGBP(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "£0";
  return "£" + num.toLocaleString();
}

function cleanText(value) {
  return String(value || "").replace(/<br\s*\/?>/gi, " ").trim();
}

function PropertyDetails({ property, onBack, onFavourite, isFavourite }) {
  const images = useMemo(() => {
    if (Array.isArray(property.images) && property.images.length) return property.images;
    if (property.picture) return [property.picture];
    return [];
  }, [property]);

  const mapUrl = useMemo(() => {
    return `https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`;
  }, [property.location]);

  const longDescription = cleanText(property.description);

  return (
    <div className="panel">
      <div className="detailsTop">
        <div>
          <button className="btn btnGhost" onClick={onBack}>
            ← Back to results
          </button>

          <h1 className="detailsTitle">
            {property.type} in {property.location}
          </h1>

          <div className="metaRow">
            <span className="badge">{formatGBP(property.price)}</span>
            <span><b>{property.bedrooms}</b> bedrooms</span>
            <span><b>{property.tenure}</b></span>
            <span>
              Added <b>{property.added?.month}</b> {property.added?.day}, {property.added?.year}
            </span>
          </div>
        </div>

        <button
          className={"btn " + (isFavourite ? "" : "btnPrimary")}
          onClick={() => onFavourite(property)}
          disabled={isFavourite}
          title={isFavourite ? "Already in favourites" : "Add to favourites"}
        >
          {isFavourite ? "Favourited ✅" : "❤️ Add to favourites"}
        </button>
      </div>

      <div className="detailsGrid">
        <div>
          <ImageGallery images={images} altBase={`${property.type} image`} />

          <div className="tabsPanel">
            <Tabs>
              <TabList>
                <Tab>Description</Tab>
                <Tab>Floor plan</Tab>
                <Tab>Google map</Tab>
              </TabList>

              <TabPanel>
                <p className="longText">{longDescription}</p>
              </TabPanel>

              <TabPanel>
                {property.floorPlan ? (
                  <img
                    className="floorPlanImg"
                    src={`/${property.floorPlan}`}
                    alt="Floor plan"
                  />
                ) : (
                  <p>No floor plan available.</p>
                )}
              </TabPanel>

              <TabPanel>
                <div className="mapBox" aria-label="Google map">
                  <iframe title="Google map" src={mapUrl} loading="lazy" />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>

        <aside className="detailsAside">
          <h2 className="h2">Key details</h2>

          <p className="kv"><b>Price:</b> {formatGBP(property.price)}</p>
          <p className="kv"><b>Bedrooms:</b> {property.bedrooms}</p>
          <p className="kv"><b>Tenure:</b> {property.tenure}</p>
          <p className="kv"><b>Added:</b> {property.added?.month} {property.added?.day}, {property.added?.year}</p>

          <p className="favHint">
            Tip: drag this property from the results list into the favourites panel on the search page.
          </p>
        </aside>
      </div>
    </div>
  );
}

export default PropertyDetails;
