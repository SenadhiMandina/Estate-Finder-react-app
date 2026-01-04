import React, { useEffect, useMemo, useRef, useState } from "react";
import propertiesData from "./data/properties.json";

import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./components/PropertyDetails";
import FavouritesPanel from "./components/FavouritesPanel";

import "./App.css";

const MONTH_INDEX = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function propertyAddedToDate(added) {
  if (!added) return null;

  const monthName = String(added.month || "").trim();
  const month = MONTH_INDEX[monthName];
  const day = Number(added.day);
  const year = Number(added.year);

  if (month === undefined || !day || !year) return null;

  return new Date(year, month, day);
}

function normalizeDateOnly(d) {
  if (!d) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toAddedDate(added) {
  if (!added) return null;
  const d = new Date(`${added.month} ${added.day}, ${added.year}`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function extractPostcodeArea(location) {
  const tokens = String(location || "")
    .toUpperCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i].replace(/[^A-Z0-9]/g, "");
    if (/[A-Z]/.test(t) && /\d/.test(t)) return t;
  }
  return "";
}

function App() {
  const allProperties = useMemo(() => propertiesData.properties || [], []);

  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    try {
      const raw = localStorage.getItem("ef_favourites");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ef_favourites", JSON.stringify(favourites));
    } catch {
    }
  }, [favourites]);

  const favouritesRef = useRef(null);

  const postcodeAreas = useMemo(() => {
    return allProperties
      .map((p) => extractPostcodeArea(p.location))
      .filter(Boolean);
  }, [allProperties]);

  function addToFavourites(property) {
    if (!property) return;

    setFavourites((prev) => {
      const exists = prev.some((f) => f.id === property.id);
      return exists ? prev : [...prev, property];
    });
  }

  function removeFromFavourites(id) {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  }

  function clearFavourites() {
    setFavourites([]);
  }

  function handleSearch(filters = {}) {
    let results = allProperties;

    if (filters.type) {
      results = results.filter((p) => p.type === filters.type);
    }

    if (filters.minPrice != null) {
      results = results.filter(
        (p) => Number(p.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice != null) {
      results = results.filter(
        (p) => Number(p.price) <= Number(filters.maxPrice)
      );
    }

    if (filters.minBeds != null) {
      results = results.filter(
        (p) => Number(p.bedrooms) >= Number(filters.minBeds)
      );
    }

    if (filters.maxBeds != null) {
      results = results.filter(
        (p) => Number(p.bedrooms) <= Number(filters.maxBeds)
      );
    }

    if (filters.postcode) {
      const q = String(filters.postcode).trim().toUpperCase();
      if (q) {
        results = results.filter((p) => {
          const area = extractPostcodeArea(p.location);
          return (
            area.startsWith(q) || String(p.location).toUpperCase().includes(q)
          );
        });
      }
    }

    if (filters.addedAfter || filters.addedBefore) {
      let after = normalizeDateOnly(filters.addedAfter);
      let before = normalizeDateOnly(filters.addedBefore);

      if (after && before && after > before) {
        [after, before] = [before, after];
      }

      results = results.filter((p) => {
        const added = propertyAddedToDate(p.added);

        if (!added) return true;
        if (after && added < after) return false; 
        if (before && added > before) return false;
        return true;
      });
    }

    setFilteredProperties(results);
  }

  function openProperty(property) {
    if (!property) return;
    setSelectedProperty(property);
    window.location.hash = property.id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function syncFromHash() {
      const id = window.location.hash.replace("#", "").trim();
      if (!id) {
        setSelectedProperty(null);
        return;
      }
      const prop = allProperties.find((p) => p.id === id);
      if (prop) setSelectedProperty(prop);
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [allProperties]);

  function onDragStartResult(e, property) {
    e.dataTransfer.setData("text/propertyId", property.id);
    e.dataTransfer.effectAllowed = "copy";
  }

  function onDropAddToFavourites(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/propertyId");
    if (!id) return;

    const prop = allProperties.find((p) => p.id === id);
    if (prop) addToFavourites(prop);
  }

  function onDragStartFavourite(e, property) {
    e.dataTransfer.setData("text/favouriteId", property.id);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDropRemoveFavourite(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/favouriteId");
    if (!id) return;
    removeFromFavourites(id);
  }

  function goToSearch() {
    setSelectedProperty(null);
    if (window.location.hash) window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToFavourites() {
    setSelectedProperty(null);
    if (window.location.hash) window.location.hash = "";
    setTimeout(() => {
      favouritesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  const inDetails = Boolean(selectedProperty);

  return (
    <div className="site">
      <SiteHeader
        onNavSearch={goToSearch}
        onNavFavourites={goToFavourites}
        favouritesCount={favourites.length}
        isInDetails={inDetails}
      />

      <main className="siteMain">
        <div className="container">
          {selectedProperty ? (
            <PropertyDetails
              property={selectedProperty}
              onBack={goToSearch}
              onFavourite={addToFavourites}
              isFavourite={favourites.some((f) => f.id === selectedProperty.id)}
            />
          ) : (
            <>
              <div className="pageGrid">
                <div className="leftCol">
                  <div className="panel" id="search">
                    <div className="resultsHeader">
                      <h1 className="h1">Find your next place</h1>
                      <span className="favHint">
                        Drag any result into favourites →
                      </span>
                    </div>

                    <SearchForm
                      onSearch={handleSearch}
                      postcodeAreas={postcodeAreas}
                    />
                  </div>

                  <div className="panel" id="results">
                    <div className="resultsHeader">
                      <h2 className="h2">
                        Results ({filteredProperties.length})
                      </h2>
                      <span className="favHint">
                        Search works with any combination of filters.
                      </span>
                    </div>

                    {filteredProperties.length === 0 ? (
                      <p className="favHint">No properties match your search.</p>
                    ) : (
                      filteredProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          isFavourite={favourites.some(
                            (f) => f.id === property.id
                          )}
                          onView={openProperty}
                          onFavourite={addToFavourites}
                          onDragStart={onDragStartResult}
                        />
                      ))
                    )}
                  </div>
                </div>

                <div className="rightCol" id="favourites">
                  <FavouritesPanel
                    innerRef={favouritesRef}
                    favourites={favourites}
                    onDropAdd={onDropAddToFavourites}
                    onDropRemove={onDropRemoveFavourite}
                    onDragStartFavourite={onDragStartFavourite}
                    onView={openProperty}
                    onRemove={removeFromFavourites}
                    onClear={clearFavourites}
                  />
                </div>
              </div>

              {/* ✅ ABOUT SECTION (added, no UI breaking) */}
              <section className="about card" id="about" aria-label="About">
                <div className="about-head">
                  <h2 className="about-title">About Property Point</h2>
                  <p className="about-lead">
                    Property Point is a client-side React app for browsing property
                    listings, applying filters, viewing details with a gallery + tabs,
                    and managing favourites using both button clicks and drag & drop.
                  </p>
                </div>

                <div className="about-grid">
                  <div className="about-card">
                    <h3>What you can do</h3>
                    <ul>
                      <li>
                        Filter by type, price range, bedrooms, and
                        location/postcode.
                      </li>
                      <li>
                        Filter by <strong>Date Added</strong> using Added after /
                        Added before.
                      </li>
                      <li>
                        Open property details with tabs (Description / Floor plan /
                        Map).
                      </li>
                      <li>
                        Browse a gallery (thumbnails + “View all images” modal).
                      </li>
                    </ul>
                  </div>

                  <div className="about-card">
                    <h3>Saved / Favourites</h3>
                    <ul>
                      <li>
                        Save using the <strong>❤️ Favourite</strong> button.
                      </li>
                      <li>
                        Save using drag & drop (drag a card into the favourites
                        panel).
                      </li>
                      <li>
                        Remove using Delete or drag a favourite into the remove
                        zone.
                      </li>
                      <li>
                        Saved items are stored in localStorage (persist on refresh).
                      </li>
                    </ul>
                  </div>

                  <div className="about-card">
                    <h3>Design + Security</h3>
                    <ul>
                      <li>Responsive layout switches below iPad landscape width.</li>
                      <li>
                        Consistent orange theme, spacing, and cards for a “real site”
                        feel.
                      </li>
                      <li>
                        Map embed uses <code>encodeURIComponent</code> for safe URL
                        building.
                      </li>
                      <li>
                        Content Security Policy (CSP) restricts what can load.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="about-cta">
                  <div>
                    <h3 className="about-cta-title">Quick guide</h3>
                    <p className="about-cta-text">
                      Use the filters to search, open “View Details”, then try saving
                      a property using both methods (button + drag into favourites).
                    </p>
                  </div>

                  <div className="about-tags">
                    <span className="tag">React</span>
                    <span className="tag">Filtering</span>
                    <span className="tag">Tabs</span>
                    <span className="tag">Gallery</span>
                    <span className="tag">Drag & Drop</span>
                    <span className="tag">Responsive</span>
                    <span className="tag">CSP</span>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;