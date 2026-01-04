import React from "react";

function formatGBP(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "£0";
  return "£" + num.toLocaleString();
}

function FavouritesPanel({
  favourites,
  onDropAdd,
  onDropRemove,
  onDragStartFavourite,
  onView,
  onRemove,
  onClear,
  innerRef,
}) {
  return (
    <div ref={innerRef} className="panel">
      <div
        className="favDrop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropAdd}
      >
        <div className="favTop">
          <h2 className="h2">Favourites ({favourites.length})</h2>

          <button
            className="btn btnDanger btnSmall"
            onClick={onClear}
            disabled={favourites.length === 0}
            title="Remove all favourites"
          >
            Clear all
          </button>
        </div>

        <p className="favHint">
          Drag a result card into this panel to add it to favourites.
        </p>

        {favourites.length === 0 ? (
          <p className="favHint">No favourites yet.</p>
        ) : (
          favourites.map((p) => {
            const img = p.picture || (p.images && p.images[0]) || "";

            return (
              <div
                key={p.id}
                className="favItem"
                draggable
                onDragStart={(e) => onDragStartFavourite(e, p)}
              >
                <div className="favLeft">
                  {img ? (
                    <img className="favThumb" src={`/${img}`} alt="Favourite thumbnail" />
                  ) : (
                    <div className="favThumb imgPlaceholder">IMG</div>
                  )}

                  <div className="favText">
                    <strong>{p.type}</strong>
                    <span title={p.location}>{p.location}</span>
                    <span>{formatGBP(p.price)}</span>
                  </div>
                </div>

                <div className="favBtns">
                  <a className="btn btnSmall" href={`#${p.id}`} onClick={(e) => { e.preventDefault(); onView(p); }}>View</a>

                  <button className="btn btnDanger btnSmall" onClick={() => onRemove(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}

        <div
          className="removeZone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropRemove}
          aria-label="Remove favourite drop zone"
        >
          🗑️ Drag a favourite here to remove
        </div>
      </div>
    </div>
  );
}

export default FavouritesPanel;
