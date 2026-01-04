import React, { useMemo, useState } from "react";

function ImageGallery({ images = [], altBase = "Property image" }) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const main = safeImages[active] || "";

  if (!safeImages.length) {
    return (
      <div className="panel">
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <div>
      <img className="galleryMain" src={`/${main}`} alt={`${altBase} ${active + 1}`} />

      <div className="thumbRow" aria-label="Image thumbnails">
        {safeImages.map((img, i) => (
          <img
            key={img + i}
            className={"thumbImg " + (i === active ? "active" : "")}
            src={`/${img}`}
            alt={`${altBase} thumbnail ${i + 1}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <div className="formActions">
        <button className="btn" onClick={() => setOpen(true)}>
          View all images
        </button>
      </div>

      {open && (
        <div
          className="modalOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="All images"
          onClick={() => setOpen(false)}
        >
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalTop">
              <h3 className="h2 m0">
                All images ({safeImages.length})
              </h3>

              <button className="btn btnSmall" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            <div className="modalGrid">
              {safeImages.map((img, i) => (
                <img
                  key={img + i}
                  src={`/${img}`}
                  alt={`${altBase} ${i + 1}`}
                  className="clickable"
                  onClick={() => {
                    setActive(i);
                    setOpen(false);
                  }}
                />
              ))}
            </div>

            <p className="favHint mt10">
              Tip: click any image to make it the main image.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
