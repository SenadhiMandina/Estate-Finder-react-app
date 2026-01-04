import React from "react";

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-title">Property Point</div>

          <div className="footer-sub">
            Browse properties, filter by price/beds/date, view details with gallery + tabs and manage favourites with drag & drop.
          </div>

          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              Instagram
            </a>
          </div>

          <div className="footer-meta">
            <span>Built with React • React Widgets • React Tabs</span>

            <span>Created by Senadhi</span>

            <span>
              Contact: <a href="tel:+94779802843">0779802843</a> • Email:{" "}
              <a href="mailto:haksenadhimandina123@gmail.com">haksenadhimandina123@gmail.com</a>
            </span>

            <span>© {year} Property Point. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;