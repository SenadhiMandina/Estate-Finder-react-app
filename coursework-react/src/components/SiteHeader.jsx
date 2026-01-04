import React from "react";

function SiteHeader({ onNavSearch, onNavFavourites, favouritesCount, isInDetails }) {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); onNavSearch(); }}>
          <div className="logo">🏘</div>
          <div>
            <div className="brandName">Estate Finder</div>
          </div>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          <button
            className={"navBtn " + (!isInDetails ? "navBtnActive" : "")}
            onClick={onNavSearch}
          >
            Search
          </button>

          <button className="navBtn" onClick={onNavFavourites}>
            Favourites ({favouritesCount})
          </button>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
